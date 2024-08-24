import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  newAccount: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    oldAccount: (state) => {
      state.newAccount = false;
    },
  },
});

export const { oldAccount } = userSlice.actions;

export default userSlice.reducer;
