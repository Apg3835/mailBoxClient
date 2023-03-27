import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { mailBoxDataActions } from "../reducer/mailBoxSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmailDataAction,
  sendToInboxEmailAction,
  sendToOutboxEmailAction,
} from "../reducer/asyncMailBoxReducer";
import { Navigate } from "react-router-dom";

export default function ComposeMailForm() {
  const dispatch = useDispatch();
  const formOpen = useSelector((state) => state.mailBoxClient.composeMailForm);
  const userData = useSelector((state) => state.auth.userProfileData);
  console.log(userData);
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [content, setContent] = React.useState("");
  const date = new Date(); // get current date and time
  const day = date.getDate(); // get day of the month (1-31)
  const month = date.toLocaleString("default", { month: "short" }); // get month abbreviation (Jan, Feb, etc.)
  const year = date.getFullYear(); // get four-digit year
  const hour = date.getHours(); // get hour (0-23)
  const minute = date.getMinutes(); // get minute (0-59)
  const ampm = hour >= 12 ? "P.M." : "A.M."; // determine AM/PM
  const hour12 = hour % 12 || 12; // convert to 12-hour format
  const time = `${hour12}:${minute}${ampm}`; // format time as "hh:mmAM/PM"
  const formattedDate = `${day} ${month} ${year} ${time}`; // format date as "day month year hh:mmAM/PM"


  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const subjectChangeHandler = (e) => {
    setSubject(e.target.value);
  };
  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const sendEmailHandler = () => {
    const senderEmailId = userData.email;
    const composeFormObj = {
      recipientEmail: email,
      subject: subject,
      content: content,
      senderEmailId: senderEmailId,
      date:formattedDate,
    };
    dispatch(sendToOutboxEmailAction(composeFormObj));
    dispatch(sendToInboxEmailAction(composeFormObj));
    setTimeout(()=>{dispatch(getEmailDataAction(userData.email))},1000)
    handleClose();
    dispatch(mailBoxDataActions.outboxListOpen());
  };
  const handleClose = () => {
    dispatch(mailBoxDataActions.closeComposeMailForm());
  };

  return (
    <div>
      <Dialog open={formOpen} onClose={handleClose}>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <TextField
            onChange={emailChangeHandler}
            value={email}
            autoFocus
            margin="dense"
            id="name"
            label=" Recipients Email"
            type="email"
            fullWidth
            variant="standard"
            placeholder="To"
          />
          <TextField
            onChange={subjectChangeHandler}
            value={subject}
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            placeholder="subject"
          />
          <TextField
            onChange={contentChangeHandler}
            value={content}
            fullWidth
            id="standard-multiline-static"
            multiline
            rows={4}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={sendEmailHandler}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
