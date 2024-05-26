import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const socketIoData = {
  onlineStudents: [],
  socketConnection: null,
};

const socketIoSlice = createSlice({
  name: "socketIoSlice",
  initialState: socketIoData,
  reducers: {
    setOnlineStudents: (state, action) => {
      state.onlineStudents = action.payload;
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});
export const { setOnlineStudents, setSocketConnection } = socketIoSlice.actions;
export const socketIo = socketIoSlice.reducer;
