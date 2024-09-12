import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const initialState = {
  isLoggedIn: false,
  newAccount: true,
  user: {},
  token: "",
};

const cookies = new Cookies(null, { path: "/" });

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    oldAccount: (state) => {
      state.newAccount = false;
      localStorage.setItem("newAccount", false);
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    editUser: (state, action) => {
      state.user = action.payload.user;
    },
    rememberUser: (state, action) => {
      const options = {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }; // 7 days
      cookies.set("token", action.payload.token, options);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    rememberEditedUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },

    getRememberedUser: (state) => {
      const token = cookies.get("token");
      const user = localStorage.getItem("user");
      if (token && user) {
        state.user = JSON.parse(user);
        state.token = token;
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
      cookies.remove("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  oldAccount,
  setUser,
  editUser,
  rememberUser,
  getRememberedUser,
  rememberEditedUser,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
