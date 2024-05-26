import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// Get All Teacher Notifications

export const getAllTeacherNotifications = createAsyncThunk(
  "getAllTeacherNotifications",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/teachers/notifications/${id}`,
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

const allTeacherNotificationsSlice = createSlice({
  name: "allTeacherNotificationsSlice",
  initialState: {
    allTeacherNotificationsData: [],
    allTeacherNotificationsLoading: false,
    allTeacherNotificationsError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllTeacherNotifications.pending, (state) => {
      state.allTeacherNotificationsLoading = true;
    });
    bilder.addCase(getAllTeacherNotifications.fulfilled, (state, action) => {
      state.allTeacherNotificationsLoading = false;
      state.allTeacherNotificationsData =
        action.payload.data.teacherNotifications;
    });
    bilder.addCase(getAllTeacherNotifications.rejected, (state, action) => {
      state.allTeacherNotificationsLoading = false;
      state.allTeacherNotificationsError = action.payload.response.data.message;
      console.log(state.allTeacherNotificationsError);
    });
  },
});

export const allTeacherNotifications = allTeacherNotificationsSlice.reducer;
