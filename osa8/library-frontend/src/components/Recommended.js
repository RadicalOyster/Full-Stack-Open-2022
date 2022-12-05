import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const ALL_GENRES = gql`
  query Query {
    allGenres
  }
`;

const BOOKS_BY_GENRES = gql`
  query BooksByGenres($genres: [String]) {
    booksByGenres(genres: $genres) {
      author
      genres
      published
      title
    }
  }
`;

const Books = ({ token, genre, show }) => {
  let filteredBooks = useQuery(BOOKS_BY_GENRES, {
    variables: { genres: [genre] }, pollInterval: 2000,
  });

  if (!token || !show) {
    return null;
  }

 filteredBooks = filteredBooks.data.booksByGenres

  return (
    <div>
      <h2>Recommended for you</h2>
      <span>Books in your favorite genre <b>{genre}</b></span>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
