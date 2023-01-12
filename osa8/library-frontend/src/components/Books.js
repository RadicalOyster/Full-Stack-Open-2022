import { useState } from "react";
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
}`

const Books = ({ show }) => {
  const [genres, setGenres] = useState([]);

  let genreList = useQuery(ALL_GENRES);
  
  let filteredBooks = useQuery(BOOKS_BY_GENRES, { variables: { genres: genres }})

  if (filteredBooks.loading) {
    return (
      <div><h2>Books</h2>

      </div>
    )
  }


  if (!show) {
    return null;
  }

  if (genreList.loading || filteredBooks.loading) {
    return (<h2>Books</h2>)
  }

  genreList = genreList.data.allGenres;
  filteredBooks = filteredBooks.data.booksByGenres

  const addGenre = (genre) => {
    const genreSet = new Set(genres.concat(genre));
    setGenres(Array.from(genreSet));
  };
  
  return (
    <div>
      <h2>Books</h2>

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
      <h3>Filter by genres</h3>
      <div>
        {genreList.map((genre) => {
          return (
            <button type="button" key={genre} onClick={() => addGenre(genre)}>
              {genre}
            </button>
          );
        })}
        <button type="button" onClick={() => setGenres([])}>Reset filter</button>
      </div>
    </div>
  );
};

export default Books;
