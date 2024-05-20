import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  isDarkModeActive: false,
};

const simpleDataFlowManagementSlice = createSlice({
  name: "simpleDataFlowManagementSlice",
  initialState: initialData,
  reducers: {
    getDarkModeState: (state, action) => {
      state.isDarkModeActive = action.payload;
    },
  },
});
export const { getDarkModeState } = simpleDataFlowManagementSlice.actions;
export const simpleDataFlowManagement = simpleDataFlowManagementSlice.reducer;
