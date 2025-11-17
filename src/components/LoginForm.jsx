import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../reducers/userReducer";
import { useField } from "../hooks";
import Togglable from "./Togglable";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username: username.input.value,
        password: password.input.value,
      }),
    );
    username.resetField();
    password.resetField();
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  if (user) {
    return (
      <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
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
            <input {...username.input} />
          </div>
          <div>
            password
            <input {...password.input} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </Togglable>
  );
};

export default LoginForm;
