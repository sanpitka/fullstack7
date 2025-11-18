import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      <h2>Blogs</h2>
      <div style={{ marginTop: "20px" }}>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
