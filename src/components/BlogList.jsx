import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const updateBlog = async (id, updatedBlog) => {
    try {
      dispatch(likeBlog({ id, ...updatedBlog }));
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: "Error updating blog",
            type: "error",
          },
          5,
        ),
      );
    }
  };

  const removeBlog = (id) => {
    try {
      dispatch(deleteBlog(id));
      dispatch(
        setNotification(
          {
            message: "Blog removed successfully",
            type: "notification",
          },
          5,
        ),
      );
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: "Error removing blog",
            type: "error",
          },
          5,
        ),
      );
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default BlogList;
