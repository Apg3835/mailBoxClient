import { createAsyncThunk } from "@reduxjs/toolkit";
import apiMailBoxServices from "../Components/services/apiMailBoxServices";

export const sendToOutboxEmailAction = createAsyncThunk(
  "sendToOutboxEmailAction",
  async (composeEmailData) => {
    await apiMailBoxServices.sendEmailSender(composeEmailData);
  }
);
export const sendToInboxEmailAction = createAsyncThunk(
  "sendToInboxEmailAction",
  async (composeEmailData) => {
    await apiMailBoxServices.sendEmailReceiver(composeEmailData);
  }
);
export const getEmailDataAction = createAsyncThunk(
  "getEmailDataAction",
  async (email) => {
    console.log(2, email);
    const response = await apiMailBoxServices.getEmailData(email);
    console.log(5, response);
    return response;
  }
);
export const deleteInboxEmail = createAsyncThunk(
  "deleteInboxEmail",
  async (data) => {
    console.log(2, data);
    const response = await apiMailBoxServices.deleteInboxEmailId(data);
  }
);
export const mailReadStausAction = createAsyncThunk(
  "mailReadStatusAction",
  async (data) => {
    await apiMailBoxServices.mailRead(data);
  }
);
export const deleteOutboxEmail = createAsyncThunk(
  "deleteOutboxEmail",
  async (data) => {
    console.log(2, data);
    const response = await apiMailBoxServices.deleteOutboxEmailId(data);
  }
);
