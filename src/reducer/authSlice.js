import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDataAction,
  userForgotPasswordAction,
  userSignInAction,
  userSignUpAction,
} from "./asyncAuthReducer";

const authSlice = createSlice({
  name: "user",
  initialState: {
    userProfileData: undefined,
    isLoggedIn: false,
  },
  reducers: {
    userLogOut(state, action) {
      localStorage.removeItem("idToken");
      state.isLoggedIn = false;
      state.userLoginData = undefined;
      state.userProfileData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignUpAction.fulfilled, (state, action) => {});
    builder.addCase(userSignInAction.fulfilled, (state, action) => {
      state.userLoginData = action.payload;
      const idToken = action.payload.idToken;
      localStorage.setItem("idToken", idToken);
      state.isLoggedIn = true;
    });
    builder.addCase(userForgotPasswordAction.fulfilled, (state, action) => {});
    builder.addCase(getUserDataAction.fulfilled, (state, action) => {
      state.userProfileData = action.payload;
    });
  },
});
export default authSlice;
export const authSliceActions = authSlice.actions;
