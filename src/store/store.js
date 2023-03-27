import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import mailBoxSlice from "../reducer/mailBoxSlice";

const store = configureStore({
  reducer: { mailBoxClient: mailBoxSlice.reducer,auth:authSlice.reducer },
});
export default store;