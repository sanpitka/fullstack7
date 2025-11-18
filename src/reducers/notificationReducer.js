import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return null;
    },
  },
});

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(set(content));
    setTimeout(() => {
      dispatch(clear());
    }, seconds * 1000);
  };
};

export const { set, clear } = notiSlice.actions;
export default notiSlice.reducer;
