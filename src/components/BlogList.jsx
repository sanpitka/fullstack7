import { useSelector } from "react-redux";
import Blog from "./Blog";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div style={{ marginTop: "20px" }}>
      <Table striped>
        <tbody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Blog key={blog.id} blog={blog} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BlogList;
