import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultStars: {
    count: 5,
    size: 15,
    activeColor: "#FFD23F",
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
  reducers: {
    starSize: (state, action) => {
      state.defaultStars.size = action.payload;
    },
  },
});

export const { starSize } = ratingStarsSlice.actions;
export default ratingStarsSlice.reducer;
