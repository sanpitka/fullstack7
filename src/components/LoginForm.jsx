import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { hideLoginForm } from "../reducers/loginReducer";
import { useField } from "../hooks";
import { Form, Button } from "react-bootstrap";

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
      <h2>login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...username.input}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            {...password.input}
          />
        </Form.Group>
        <Button variant="secondary" onClick={handleCancel} type="button">
          cancel
        </Button>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
