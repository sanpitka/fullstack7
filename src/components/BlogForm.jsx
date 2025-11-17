import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useRef } from "react";
import Togglable from "./Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const onCreate = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    dispatch(createBlog({ title, author, url }));
    dispatch(
      setNotification(
        {
          message: `A new blog '${title}' by ${author} added`,
          type: "notification",
        },
        5,
      ),
    );

    event.target.reset();
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel="add new blog" ref={blogFormRef}>
      <div>
        <h2>add new blog</h2>
        <form onSubmit={onCreate}>
          <div>
            <label>
              title:
              <input type="text" name="title" />
            </label>
          </div>
          <div>
            <label>
              author:
              <input type="text" name="author" />
            </label>
          </div>
          <div>
            <label>
              url:
              <input type="text" name="url" />
            </label>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
