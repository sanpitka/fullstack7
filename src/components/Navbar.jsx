import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { showLoginForm } from "../reducers/loginReducer";

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

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleLoginClick = () => {
    dispatch(showLoginForm());
  };

  return (
    <div style={navbarStyle}>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user ? (
        <span>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      ) : (
        <button onClick={handleLoginClick}>login</button>
      )}
    </div>
  );
};

export default Navbar;
