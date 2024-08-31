import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../assets/axios/server";

const fetchPlayersData = createAsyncThunk(
  "players/fetchPlayersData",
  async () => {
    try {
      const response = await server.get("/players");
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);
const voteForPlayer = createAsyncThunk("players/voteForPlayer", async (id) => {
  try {
    const response = await server.get(`/make-vote/${id}`);
    console.log(response.data.data);

    return response.data.data;
  } catch (error) {
    throw error;
  }
});

const playersDataSlice = createSlice({
  name: "players",
  initialState: {
    players: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlayersData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.players = action.payload;
      })
      .addCase(fetchPlayersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(voteForPlayer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(voteForPlayer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.players = action.payload;
      })
      .addCase(voteForPlayer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export { fetchPlayersData, voteForPlayer };

export default playersDataSlice.reducer;
