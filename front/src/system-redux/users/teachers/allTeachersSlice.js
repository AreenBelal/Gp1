import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// get all Teacher

export const getAllTeachers = createAsyncThunk(
  "getAllTeachers",
  async (page, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/teachers?page=${page || 1}`,
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

const allTeachersSlice = createSlice({
  name: "allTeachersSlice",
  initialState: {
    teachersData: [],
    teachersLoading: false,
    teachersError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllTeachers.pending, (state) => {
      state.teachersLoading = true;
    });
    bilder.addCase(getAllTeachers.fulfilled, (state, action) => {
      state.teachersLoading = false;
      state.teachersData = action.payload.data.teachers;
    });
    bilder.addCase(getAllTeachers.rejected, (state, action) => {
      state.teachersLoading = false;
      state.teachersError = action.payload.response.data.message;
      console.log(state.teachersError);
    });
  },
});

export const allTeachers = allTeachersSlice.reducer;
