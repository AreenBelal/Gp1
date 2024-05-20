import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// get single Owner

export const getSingleOwner = createAsyncThunk(
  "getSingleOwner",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/owners/${id}`,
      //   headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios(option);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const singleOwnerSlice = createSlice({
  name: "singleOwnerSlice",
  initialState: {
    ownerData: {},
    ownerLoading: false,
    ownerError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getSingleOwner.pending, (state) => {
      state.ownerLoading = true;
    });
    bilder.addCase(getSingleOwner.fulfilled, (state, action) => {
      state.ownerLoading = false;
      state.ownerData = action.payload.data.owner;
    });
    bilder.addCase(getSingleOwner.rejected, (state, action) => {
      state.ownerLoading = false;
      state.ownerError = action.payload.response.data.message;
      console.log(state.ownerError);
    });
  },
});

export const singleOwner = singleOwnerSlice.reducer;
