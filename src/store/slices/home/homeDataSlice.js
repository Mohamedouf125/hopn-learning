import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../assets/axios/server";


 const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async (token) => {
    try {
      const response = await server.get("/home", { headers: {
        Authorization: `Bearer ${token}`,
      }},);
      
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const homeDataSlice = createSlice({
  name: "home",
  initialState: {
    sliders: [],
    cvs: [],
    courses: [],
    users: [],
    voted_player:{},
    trainers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sliders = action.payload.sliders;
        state.cvs = action.payload.cvs;
        state.courses = action.payload.courses;
        state.users = action.payload.users;
        state.voted_player = action.payload.voted_player;
        state.trainers = action.payload.trainers;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchHomeData };

export default homeDataSlice.reducer;
