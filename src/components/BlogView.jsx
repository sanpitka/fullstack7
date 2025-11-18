import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { initializeComments } from "../reducers/commentReducer";
import { setNotification } from "../reducers/notificationReducer";
import CommentForm from "./CommentForm";

const BlogView = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );
  const user = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(initializeComments(id));
  }, [dispatch, id]);

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );
    if (confirmed) {
      dispatch(deleteBlog(blog.id));
      dispatch(
        setNotification(
          {
            message: `Blog '${blog.title}' removed`,
            type: "notification",
          },
          5,
        ),
      );
      navigate("/");
    }
  };

  const isOwner = user && blog.user.username === user.username;

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={handleLike} id="like-button">
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {isOwner && (
        <div>
          <button onClick={handleRemove} id="remove-button">
            remove
          </button>
        </div>
      )}

      <h3>comments</h3>
      <CommentForm />
      {comments.length === 0 && <p>No comments yet</p>}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
