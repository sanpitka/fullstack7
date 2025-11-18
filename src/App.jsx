import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";
import { initializeUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import Navbar from "./components/Navbar";
import BlogView from "./components/BlogView";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import CommentForm from "./components/CommentForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const matchBlogs = useMatch("/");
  const user = useSelector((state) => state.user);
  const showLoginForm = useSelector((state) => state.login.showLoginForm);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Notification />
      {!user && showLoginForm && <LoginForm />}
      {matchBlogs && <BlogForm />}
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id/comments" element={<CommentForm />} />
      </Routes>
    </div>
  );
};

export default App;
