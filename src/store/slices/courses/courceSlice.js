import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../assets/axios/server";

const fetchCourseData = createAsyncThunk(
  "Course/fetchCourseData",
  async (id) => {
    try {
      const response = await server.get(`/course-show-api/${id}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const courseDataSlice = createSlice({
  name: "course",
  initialState: {
    course: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.course = action.payload;
      })
      .addCase(fetchCourseData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchCourseData };
export default courseDataSlice.reducer;
