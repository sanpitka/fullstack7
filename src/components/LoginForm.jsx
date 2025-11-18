import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { hideLoginForm } from "../reducers/loginReducer";
import { useField } from "../hooks";

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();

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

  const handleCancel = () => {
    dispatch(hideLoginForm());
    username.resetField();
    password.resetField();
  };

  return (
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
        <button type="button" onClick={handleCancel}>
          cancel
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
