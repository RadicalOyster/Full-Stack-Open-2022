import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Select from "react-select";

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      name
    }
  }
`;

const Authors = ({ authors, show }) => {
  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name: name.value, setBornTo: parseInt(born) } });

    setBorn("");
  };

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((author) => (
            <tr key={author.name}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div style={{ maxWidth: "300px", marginBottom: "10px" }}>
          <Select
            options={authors.map((author) => {
              return { value: author.name, label: author.name };
            })}
            onChange={setName}
          />
        </div>
        <div>
          Born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Set birthyear</button>
      </form>
    </div>
  );
};

export default Authors;
