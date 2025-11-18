import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload;
    },
    appendComment(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setComments, appendComment } = commentSlice.actions;

export const initializeComments = (blogId) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(blogId);
    dispatch(setComments(comments));
  };
};

export const createComment = (blogId, content) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, content);
    dispatch(appendComment(newComment));
  };
};

export default commentSlice.reducer;
