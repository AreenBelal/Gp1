import { createSlice } from "@reduxjs/toolkit";

const usersManagementData = {
  manageUserData: {},
};

const usersManagementSlice = createSlice({
  name: "usersManagementSlice",
  initialState: usersManagementData,
  reducers: {
    manageUser: (state, action) => {
      state.manageUserData = action.payload;
    },
  },
});
export const { manageUser } = usersManagementSlice.actions;
export const usersManagement = usersManagementSlice.reducer;
