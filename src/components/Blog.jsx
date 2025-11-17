import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    updateBlog(blog.id, blog);
  };

  const handleRemove = () => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );
    if (confirmed) {
      removeBlog(blog.id);
    }
  };

  const loggedUser = window.localStorage.getItem("loggedUser");
  const isOwner = loggedUser
    ? blog.user.username === JSON.parse(loggedUser).username
    : false;

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {isOwner && (
            <div>
              <button onClick={handleRemove}>remove</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
