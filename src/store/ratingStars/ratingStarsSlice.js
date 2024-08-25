import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultStars: {
    count: 5,
    size: 20,
    activeColor: "#FFD130",
    edit: false,
    value: 4.5,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
  },
};

export const ratingStarsSlice = createSlice({
  name: "ratingStars",
  initialState,
  reducers: {},
});

export const {} = ratingStarsSlice.actions;

export default ratingStarsSlice.reducer;
