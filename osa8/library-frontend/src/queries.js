import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author
      genres
      published
      title
    }
  }
`;

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      born
      bookCount
      name
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      author
      genres
      published
      title
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      favoriteGenre
      id
      username
    }
  }
`;

export const ALL_GENRES = gql`
  query Query {
    allGenres
  }
`;

export const BOOKS_BY_GENRES = gql`
  query BooksByGenres($genres: [String]) {
    booksByGenres(genres: $genres) {
      author
      genres
      published
      title
    }
  }
`;