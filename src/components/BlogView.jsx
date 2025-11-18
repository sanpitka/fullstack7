import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";

const BlogView = () => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );
  const dispatch = useDispatch();

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
    }
  };

  const loggedUser = window.localStorage.getItem("loggedUser");
  const isOwner = loggedUser
    ? blog.user.username === JSON.parse(loggedUser).username
    : false;

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
    </div>
  );
};

export default BlogView;
