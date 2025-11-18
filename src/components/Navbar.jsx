import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { showLoginForm } from "../reducers/loginReducer";
import { Nav } from "react-bootstrap";

const padding = {
  paddingRight: 5,
};

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navbarStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    backgroundColor: "#a4eebeff",
    padding: "5px",
  };

  const navItemStyle = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLoginClick = () => {
    dispatch(showLoginForm());
  };

  return (
      <Nav 
        variant="tabs" 
        defaultActiveKey="/" 
        style={navbarStyle}
      >
        <Nav.Item>
          <Nav.Link as={Link} style={padding} to="/">blogs</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} style={padding} to="/users">users</Nav.Link>
        </Nav.Item>
        <Nav.Item style={navItemStyle}>
          {user ? (
            <><em>{user.name} logged in</em>
              <Nav.Link as={Link} to="/" onClick={handleLogout} style={{marginLeft: "10px"}}>
                logout
              </Nav.Link>
            </>
          ) : (
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={handleLoginClick}>login</Nav.Link>
            </Nav.Item>
          )}
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;

{/* <div style={navbarStyle}>
  <Link to="/">blogs</Link>
  <Link to="/users">users</Link>
  {user ? (
    <span>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </span>
  ) : (
    <button onClick={handleLoginClick}>login</button>
  )}
</div> */}