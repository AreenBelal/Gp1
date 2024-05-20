import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// get single Teacher

export const getSingleTeacher = createAsyncThunk(
  "getSingleTeacher",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/teachers/${id}`,
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

const singleTeacherSlice = createSlice({
  name: "singleTeacherSlice",
  initialState: {
    teacherData: {},
    teacherLoading: false,
    teacherError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getSingleTeacher.pending, (state) => {
      state.teacherLoading = true;
    });
    bilder.addCase(getSingleTeacher.fulfilled, (state, action) => {
      state.teacherLoading = false;
      state.teacherData = action.payload.data.teacher;
    });
    bilder.addCase(getSingleTeacher.rejected, (state, action) => {
      state.teacherLoading = false;
      state.teacherError = action.payload.response.data.message;
      console.log(state.teacherError);
    });
  },
});

export const singleTeacher = singleTeacherSlice.reducer;
