import { useQuery } from "@apollo/client";
import { BOOKS_BY_GENRES } from '../queries'

const Books = ({ token, genre, show }) => {
  let filteredBooks = useQuery(BOOKS_BY_GENRES, {
    variables: { genres: [genre] }
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
