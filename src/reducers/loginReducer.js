import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    showLoginForm: false,
  },
  reducers: {
    showLoginForm(state) {
      state.showLoginForm = true;
    },
    hideLoginForm(state) {
      state.showLoginForm = false;
    },
  },
});

export const { showLoginForm, hideLoginForm } = loginSlice.actions;
export default loginSlice.reducer;
