import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const authData = {
  cn: false,
  tc: "",
  ro: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: authData,
  reducers: {
    setAuth: (state, action) => {
      const token = action.payload.data.data.token;
      if (token) {
        const { role, id } = jwtDecode(token);
        Cookies.set("cn", true);
        Cookies.set("tc", token);
        state.tc = token;
        state.cn = true;
        state.ro = role;
      }
    },

    logoutAuth: (state, action) => {
      state.tc = "";
      state.cn = false;
      state.ro = "";
      Cookies.remove("tc");
      Cookies.remove("cn");
    },
  },
});
export const { setAuth, logoutAuth } = authSlice.actions;
export const auth = authSlice.reducer;
