import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// get all courses

export const getAllCourses = createAsyncThunk(
  "getAllCourses",
  async (studentId, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/students/courses/${studentId}`,
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

const allCoursesSlice = createSlice({
  name: "allCoursesSlice",
  initialState: {
    coursesData: [],
    coursesLoading: false,
    coursesError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllCourses.pending, (state) => {
      state.coursesLoading = true;
    });
    bilder.addCase(getAllCourses.fulfilled, (state, action) => {
      state.coursesLoading = false;
      state.coursesData = action.payload.data.courses;
    });
    bilder.addCase(getAllCourses.rejected, (state, action) => {
      state.coursesLoading = false;
      state.coursesError = action.payload.response.data.message;
      console.log(state.coursesError);
    });
  },
});

export const allCourses = allCoursesSlice.reducer;
