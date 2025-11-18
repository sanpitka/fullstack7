import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";
import { hideLoginForm } from "./loginReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(hideLoginForm());
    } catch (error) {
      dispatch(
        setNotification(
          {
            message: "Wrong username or password",
            type: "error",
          },
          5,
        ),
      );
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    blogService.setToken(null);
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
