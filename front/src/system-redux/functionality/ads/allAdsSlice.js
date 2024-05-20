import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// get all ADS

export const getAllAds = createAsyncThunk(
  "getAllAds",
  async (page, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/owners/ads?page=${page}`,
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

const allAdsSlice = createSlice({
  name: "allAdsSlice",
  initialState: {
    adsData: [],
    adsLoading: false,
    adsError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllAds.pending, (state) => {
      state.adsLoading = true;
    });
    bilder.addCase(getAllAds.fulfilled, (state, action) => {
      state.adsLoading = false;
      state.adsData = action.payload.data.ads;
    });
    bilder.addCase(getAllAds.rejected, (state, action) => {
      state.adsLoading = false;
      state.adsError = action.payload.response.data.message;
      console.log(state.adsError);
    });
  },
});

export const allAds = allAdsSlice.reducer;
