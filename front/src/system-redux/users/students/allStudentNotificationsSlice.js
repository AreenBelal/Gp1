import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// Get All Student Notifications

export const getAllStudentNotifications = createAsyncThunk(
  "getAllStudentNotifications",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/students/notifications/${id}`,
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

const allStudentNotificationsSlice = createSlice({
  name: "allStudentNotificationsSlice",
  initialState: {
    allStudentNotificationsData: [],
    allStudentNotificationsLoading: false,
    allStudentNotificationsError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllStudentNotifications.pending, (state) => {
      state.allStudentNotificationsLoading = true;
    });
    bilder.addCase(getAllStudentNotifications.fulfilled, (state, action) => {
      state.allStudentNotificationsLoading = false;
      state.allStudentNotificationsData =
        action.payload.data.studentNotifications;
    });
    bilder.addCase(getAllStudentNotifications.rejected, (state, action) => {
      state.allStudentNotificationsLoading = false;
      state.allStudentNotificationsError = action.payload.response.data.message;
      console.log(state.allStudentNotificationsError);
    });
  },
});

export const allStudentNotifications = allStudentNotificationsSlice.reducer;
