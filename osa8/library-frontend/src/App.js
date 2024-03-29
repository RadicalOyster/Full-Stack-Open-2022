import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, LOGIN, ME, BOOK_ADDED } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });
  const currentUser = useQuery(ME, {
    pollInterval: 2000,
  });
  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const LoginLogout = () => {
    if (!token) {
      return <button onClick={() => setPage("login")}>Login</button>;
    }
    return <button onClick={() => logout()}>Logout</button>;
  };

  const NewBookButton = () => {
    if (!token) {
      return null;
    }
    return <button onClick={() => setPage("add")}>Add book</button>;
  };

  const RecommendedButton = () => {
    if (!token) {
      return null;
    }
    return <button onClick={() => setPage("recommended")}>Recommended</button>;
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <RecommendedButton />
        <NewBookButton />
        <LoginLogout />
      </div>

      <Authors
        authors={authors.data.allAuthors}
        token={token}
        show={page === "authors"}
      />

      <Books books={books.data.allBooks} show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended
        show={page === "recommended"}
        token={token}
        genre={currentUser.data.me.favoriteGenre}
      />

      <Login
        show={page === "login"}
        setToken={setToken}
        token={token}
        logout={logout}
        login={login}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
