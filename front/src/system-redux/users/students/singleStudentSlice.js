import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// get single Student

export const getSingleStudent = createAsyncThunk(
  "getSingleStudent",
  async (id, ThunkAPI) => {
    console.log(id);
    const { rejectWithValue } = ThunkAPI;
    const option = {
      method: "GET",
      url: `${base_url}/students/${id}`,
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

const singleStudentSlice = createSlice({
  name: "singleStudentSlice",
  initialState: {
    studentData: {},
    studentLoading: false,
    studentError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getSingleStudent.pending, (state) => {
      state.studentLoading = true;
    });
    bilder.addCase(getSingleStudent.fulfilled, (state, action) => {
      state.studentLoading = false;
      state.studentData = action.payload.data.student;
    });
    bilder.addCase(getSingleStudent.rejected, (state, action) => {
      state.studentLoading = false;
      state.studentError = action.payload.response.data.message;
      console.log(state.studentError);
    });
  },
});

export const singleStudent = singleStudentSlice.reducer;
