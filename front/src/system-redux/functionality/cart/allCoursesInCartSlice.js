import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../data/apis";

// get all ADS

export const getAllCoursesInCart = createAsyncThunk(
  "getAllCoursesInCart",
  async (studentId, ThunkAPI) => {
    const { rejectWithValue } = ThunkAPI;

    const option = {
      method: "GET",
      url: `${base_url}/students/cart/${studentId}`,
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

const allCoursesInCartSlice = createSlice({
  name: "allCoursesInCartSlice",
  initialState: {
    coursesInCartData: [],
    coursesInCartLoading: false,
    coursesInCartError: null,
  },
  reducers: {},
  extraReducers: (bilder) => {
    bilder.addCase(getAllCoursesInCart.pending, (state) => {
      state.coursesInCartLoading = true;
    });
    bilder.addCase(getAllCoursesInCart.fulfilled, (state, action) => {
      state.coursesInCartLoading = false;
      state.coursesInCartData = action.payload.data.cart;
    });
    bilder.addCase(getAllCoursesInCart.rejected, (state, action) => {
      state.coursesInCartLoading = false;
      state.coursesInCartError = action.payload.response.data.message;
      console.log(state.coursesInCartError);
    });
  },
});

export const allCoursesInCart = allCoursesInCartSlice.reducer;
