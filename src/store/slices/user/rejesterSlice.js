import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  date: "",
  email: "",
  password: "",
  password_confirmation: "",
  country_id: "",
  sex: "male",
};

export const rejesterSlice = createSlice({
  name: "rejester",
  initialState,
  reducers: {
    changeData: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetRejesterState: (state) => {
      state.name = "";
      state.date = "";
      state.email = "";
      state.password = "";
      state.password_confirmation = "";
      state.country_id = "2";
      state.sex = "male";
      
    },
  },
});

export const { changeData, resetRejesterState } = rejesterSlice.actions;

export default rejesterSlice.reducer;
