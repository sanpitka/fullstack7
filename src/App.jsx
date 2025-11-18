import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { initializeUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import BlogView from "./components/BlogView";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const matchBlogs = useMatch("/");

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      {matchBlogs && <BlogForm />}
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  );
};

export default App;
