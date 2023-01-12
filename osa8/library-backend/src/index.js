const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const config = require("./utils/config");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const JWT_SECRET = "SUPER_SECRET";

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: String!
    published: Int
    genres: [String]
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
  }

  type Genre {
    label: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    allGenres: [String]
    booksByGenres(genres: [String]): [Book]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]
    ): Book
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const mapAuthor = async (author) => {
  const authoredBooks = await Book.collection.countDocuments({
    author: author._id,
  });
  const mappedAuthor = {
    name: author.name,
    bookCount: authoredBooks,
    born: author.born,
  };
  return mappedAuthor;
};

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
  let authors = await Author.find({});
  authors = authors.map((author) => mapAuthor(author));
  return authors;
};

getGenres = async () => {
  const books = await Book.find({});
  let genres = new Set()
  books.forEach(book => {
    book.genres.forEach(genre => {
      genres.add(genre)
    })
  })
  return Array.from(genres)
}

getBooksByGenres = async (genres) => {
  let books = await Book.find({}).populate("author")
  books = books.map(book => {
    return ( {author: book.author.name, title: book.title, genres: book.genres, published: book.published } )
  })

  if (genres.length === 0) {
    return books
  }

  const booksWithGenres = books.filter(book => {
    return book.genres.some(genre => genres.includes(genre));
  })
  return booksWithGenres
}

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
      return getBooksByGenres(args.genres)
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
        const addedBook = await bookToAdd.save();
        addedBook.populate("author");
        return {
          title: addedBook.title,
          author: addedBook.author.name,
          published: addedBook.published,
          genres: addedBook.genres,
        };
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
