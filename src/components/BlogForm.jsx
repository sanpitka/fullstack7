import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useRef } from "react";
import { useField } from "../hooks";
import Togglable from "./Togglable";

const BlogForm = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user);

  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const onCreate = (event) => {
    event.preventDefault();

    if (!title.input.value || !author.input.value || !url.input.value) {
      dispatch(
        setNotification(
          {
            message: "All fields are required",
            type: "error",
          },
          5,
        ),
      );
      return;
    }
    dispatch(
      createBlog({
        title: title.input.value,
        author: author.input.value,
        url: url.input.value,
      }),
    );

    dispatch(
      setNotification(
        {
          message: `A new blog '${title.input.value}' by ${author.input.value} added`,
          type: "notification",
        },
        5,
      ),
    );
    title.resetField();
    author.resetField();
    url.resetField();

    blogFormRef.current.toggleVisibility();
  };

  const handleCancel = () => {
    title.resetField();
    author.resetField();
    url.resetField();
    blogFormRef.current.toggleVisibility();
  };

  if (!user) {
    return null;
  }

  return (
    <Togglable buttonLabel="add new blog" ref={blogFormRef} hideCancel={true}>
      <div>
        <h2>add new blog</h2>
        <form onSubmit={onCreate}>
          <div>
            <label>
              title:
              <input {...title.input} />
            </label>
          </div>
          <div>
            <label>
              author:
              <input {...author.input} />
            </label>
          </div>
          <div>
            <label>
              url:
              <input {...url.input} />
            </label>
          </div>
          <button type="button" onClick={handleCancel}>cancel</button>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  );
};

export default BlogForm;
