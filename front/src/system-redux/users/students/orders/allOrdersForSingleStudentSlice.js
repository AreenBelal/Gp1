import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../data/apis";

// get single Student

export const getAllOrdersForSingleStudent = createAsyncThunk(
  "getAllOrdersForSingleStudent",
  async (studentId, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;
    const option = {
      method: "GET",
      url: `${base_url}/orders/${studentId}`,
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

const allOrdersForSingleStudentSlice = createSlice({
  name: "allOrdersForSingleStudentSlice",
  initialState: {
    allOrdersForSingleStudentData: [],
    allOrdersForSingleStudentLoading: false,
    allOrdersForSingleStudentError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllOrdersForSingleStudent.pending, (state) => {
      state.allOrdersForSingleStudentLoading = true;
    });
    bilder.addCase(getAllOrdersForSingleStudent.fulfilled, (state, action) => {
      state.allOrdersForSingleStudentLoading = false;
      state.allOrdersForSingleStudentData = action.payload.data.orders;
      console.log(action.payload);
    });
    bilder.addCase(getAllOrdersForSingleStudent.rejected, (state, action) => {
      state.allOrdersForSingleStudentLoading = false;
      state.allOrdersForSingleStudentError =
        action.payload.response.data.message;
      console.log(state.allOrdersForSingleStudentError);
    });
  },
});

export const allOrdersForSingleStudent = allOrdersForSingleStudentSlice.reducer;
