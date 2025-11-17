import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      <BlogForm />
      <BlogList />
    </div>
  );
};

export default App;
