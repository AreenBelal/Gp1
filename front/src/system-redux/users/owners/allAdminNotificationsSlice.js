import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// Get All Admin Notifications

export const getAllAdminNotifications = createAsyncThunk(
  "getAllAdminNotifications",
  async (id, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/owners/notifications/${id}`,
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

const allAdminNotificationsSlice = createSlice({
  name: "allAdminNotificationsSlice",
  initialState: {
    allAdminNotificationsData: [],
    allAdminNotificationsLoading: false,
    allAdminNotificationsError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllAdminNotifications.pending, (state) => {
      state.allAdminNotificationsLoading = true;
    });
    bilder.addCase(getAllAdminNotifications.fulfilled, (state, action) => {
      state.allAdminNotificationsLoading = false;
      state.allAdminNotificationsData = action.payload.data.adminNotifications;
    });
    bilder.addCase(getAllAdminNotifications.rejected, (state, action) => {
      state.allAdminNotificationsLoading = false;
      state.allAdminNotificationsError = action.payload.response.data.message;
      console.log(state.allAdminNotificationsError);
    });
  },
});

export const allAdminNotifications = allAdminNotificationsSlice.reducer;
