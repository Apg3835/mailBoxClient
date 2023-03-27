import { createSlice } from "@reduxjs/toolkit";
import { getEmailDataAction } from "./asyncMailBoxReducer";

const mailBoxSlice = createSlice({
  name: "mailBoxClient",
  initialState: {
    composeMailForm: false,
    listedEmailOpenForm: false,
    email: undefined,
    inboxArr: [],
    outboxArr: [],
    inboxList: true,
    outboxList: false,
  },
  reducers: {
    userLogout(state,action){
      state.inboxArr=[];
      state.outboxArr=[];
    },
    composeMailFormOpen(state, action) {
      state.composeMailForm = true;
    },
    closeComposeMailForm(state, action) {
      state.composeMailForm = false;
      state.email=undefined;
    },
    listedEmailFormOpen(state, action) {
      state.listedEmailOpenForm = true;
      state.email = action.payload;
    },
    closelistedEmailForm(state, action) {
      state.listedEmailOpenForm = false;
    },
    inboxListOpen(state, action) {
      state.inboxList = true;
      state.outboxList = false;
    },
    outboxListOpen(state, action) {
      state.outboxList = true;
      state.inboxList = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmailDataAction.fulfilled, (state, action) => {
      const inboxData = action.payload.inbox;
      console.log(inboxData);
      const newInboxArr = [];
      for (const key in inboxData) {
        const inboxObject = inboxData[key];
        newInboxArr.push({
          key: key,
          senderEmail: inboxObject.senderEmail,
          // recipientEmail: inboxObject.recipientEmail,
          content: inboxObject.content,
          subject: inboxObject.subject,
          mailReadStatus: inboxObject.mailReadStatus,
          date:inboxObject.date
        });
      }
      state.inboxArr = newInboxArr;
      // state.inboxList = true;
      console.log(state.inboxArr);

      const outboxData = action.payload.outbox;
      console.log(outboxData);
      const newOutboxArr = [];
      for (const key in outboxData) {
        const outboxObject = outboxData[key];
        newOutboxArr.push({
          key: key,
          // senderEmail: outboxObject.senderEmail,
          recipientEmail: outboxObject.recipientEmail,
          content: outboxObject.content,
          subject: outboxObject.subject,
          date:outboxObject.date
        });
      }
      state.outboxArr = newOutboxArr;
      console.log(state.outboxArr);
    });
  },
});
export default mailBoxSlice;
export const mailBoxDataActions = mailBoxSlice.actions;
