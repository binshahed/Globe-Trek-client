import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Cookies from "js-cookie"; // Import js-cookie

export type TUserData = {
  data: {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
    subscriptions: "free" | "premium";
    role: string;
    address: string;
    followers: string[];
    following: string[];
  };
  iat: number;
  exp: number;
};

type TAuth = {
  user: null | TUserData;
  token: null | string;
};

const initialState: TAuth = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("refreshToken");
    }
  }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
