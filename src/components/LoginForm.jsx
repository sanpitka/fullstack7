import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../reducers/userReducer";
import Togglable from "./Togglable";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  if (user) {
    return (
      <div>
        <p>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </p>
      </div>
    );
  }

  return (
    <Togglable buttonLabel="login">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </Togglable>
  );
};

export default LoginForm;
