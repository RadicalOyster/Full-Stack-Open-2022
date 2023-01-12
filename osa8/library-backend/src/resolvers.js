const { UserInputError, AuthenticationError } = require("apollo-server");
const config = require("./utils/config");
const jwt = require("jsonwebtoken");
const JWT_SECRET = config.JWT_SECRET;

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const getBooks = async (author, genre) => {
  let filteredBooks = await Book.find({}).populate("author");
  if (author) {
    filteredBooks = filteredBooks.filter((book) => book.author === author);
  }

  if (genre) {
    filteredBooks = filteredBooks.filter((book) => book.genres.includes(genre));
  }

  const test = filteredBooks.map((book) => {
    return {
      title: book.title,
      author: book.author.name,
      published: book.published,
      genres: book.genres,
    };
  });
  return test;
};

getAuthors = async () => {
  let books = await Book.find({});
  let authors = await Author.find({});

  const authorsMap = new Map();

  for (let i = 0; i < authors.length; i++) {
    const author = authors[i];
    authorsMap.set(author._id.toHexString(), {
      name: author.name,
      born: author.born,
      bookCount: 0,
    });
  }

  for (let i = 0; i < books.length; i++) {
    const author = books[i].author.toHexString();


    if (authorsMap.has(author)) {
      authorsMap.set(author, {
        ...authorsMap.get(author),
        bookCount: authorsMap.get(author).bookCount + 1,
      });
    }
  }
  return authorsMap.values();
};

getGenres = async () => {
  const books = await Book.find({});
  let genres = new Set();
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      genres.add(genre);
    });
  });
  return Array.from(genres);
};

getBooksByGenres = async (genres) => {
  let books = await Book.find({}).populate("author");
  books = books.map((book) => {
    return {
      author: book.author.name,
      title: book.title,
      genres: book.genres,
      published: book.published,
    };
  });

  if (genres.length === 0) {
    return books;
  }

  const booksWithGenres = books.filter((book) => {
    return book.genres.some((genre) => genres.includes(genre));
  });
  return booksWithGenres;
};

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => await getBooks(args.author, args.genre),
    allAuthors: async () => getAuthors(),
    allGenres: async () => getGenres(),
    me: (root, args, context) => {
      return context.currentUser;
    },
    booksByGenres: async (root, args) => {
      return getBooksByGenres(args.genres);
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const authors = await Author.find({});
      bookAuthor = authors.find((author) => author.name === args.author);
      try {
        if (!bookAuthor) {
          const newAuthor = { name: args.author };
          const authorToAdd = new Author(newAuthor);
          bookAuthor = await authorToAdd.save();
        }

        bookToAdd = new Book({ ...args, author: bookAuthor });
        const bookAdded = await bookToAdd.save();
        bookAdded.populate("author");
        const newBook = {
          title: bookAdded.title,
          author: bookAdded.author.name,
          published: bookAdded.published,
          genres: bookAdded.genres,
        };
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook });

        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      if (author) {
        try {
          const updatedAuthor = await Author.findOneAndUpdate(
            { _id: author._id },
            { born: args.setBornTo }
          );
          return updatedAuthor;
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      return null;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
