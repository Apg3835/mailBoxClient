import { createAsyncThunk } from "@reduxjs/toolkit";
import apiAuthServices from "../Components/services/apiAuthServices";

export const userSignUpAction = createAsyncThunk(
  "userSignUpAction",
  async (credential) => {
    // console.log(2, credential);
    const response = await apiAuthServices.signUp(credential);
    // console.log(5, response);
    return response;
  }
);
export const userSignInAction = createAsyncThunk(
  "userSignInAction",
  async (credential,thunkAPI) => {
    // console.log(2, credential);
    const response = await apiAuthServices.signIn(credential);
    // console.log(5, response);
    setTimeout(() => {
      thunkAPI.dispatch(getUserDataAction());
    }, 1000);
    return response;
  }
);
export const userForgotPasswordAction = createAsyncThunk(
  "userForgotPasswordAction",
  async (credential) => {
    // console.log(2, credential);
    const response = await apiAuthServices.forgotPassword(credential);
    // console.log(5, response);
    return response;
  }
);
export const getUserDataAction = createAsyncThunk(
  "getUserDataAction",
  
  async () => {
    console.log("async getuserdata")
    const response = await apiAuthServices.getUserData();
    return response;
  }
);
export const updateUserProfileAction = createAsyncThunk(
  "updateUserProfileAction",
  async (credential) => {
    // console.log(2, credential);
    const response = await apiAuthServices.updateUserData(credential);
    // console.log(5,response);
    return response;
  }
);
