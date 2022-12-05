import { useState } from "react";

const Login = ({ show, login, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!show) {
    return null;
  }

  const submitLogin = async (event) => {
    event.preventDefault();
    login({ variables: { username: username, password: password } });
    setPage("authors")
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitLogin}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
