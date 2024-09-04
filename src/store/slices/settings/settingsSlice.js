import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
  theme: "light",
};

export const settingsSlice = createSlice({
  name: "ratingStars",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload.lang;
      localStorage.setItem("lang", action.payload.lang);
      window.location.reload();
      localStorage.setItem(
        "dir",
        `${action.payload.lang === "en" ? "ltr" : "rtl"}`
      );
    },
    getCurrentLang: (state) => {
      state.lang = localStorage.getItem("lang") || "en";
      document.documentElement.setAttribute(
        "dir",
        localStorage.getItem("dir") || "ltr"
      );
    },
    changeTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { changeLang, getCurrentLang, changeTheme } =
  settingsSlice.actions;

export default settingsSlice.reducer;
