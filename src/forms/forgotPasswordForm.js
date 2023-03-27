import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper } from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userForgotPasswordAction } from "../reducer/asyncAuthReducer";

export default function ForgotPasswordForm() {
  const navigate=useNavigate();
    const dispatch=useDispatch();
  const [open, setOpen] = React.useState(false);
  const [passwordEmail, setPasswordEmail] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const enteredEmailHandler = (e) => {
    setPasswordEmail(e.target.value);
  };
  const signinFormHandler=()=>{
    navigate('/')
  }
  const submitEmailHandler = (e) => {
    e.preventDefault();
    const emailDetail = {
      email: passwordEmail,
    };
    setPasswordEmail("");
    dispatch(userForgotPasswordAction(emailDetail))
    // console.log(emailDetail);
    // navigate('/signinform')
  };

  return (
    <div>
      <Paper
        elevation={50}
        sx={{
          padding: "30px 20px",
          width: 650,
          //  height: 8,
          margin: "20px auto",
          boxShadow: "5px 5px 5px #353738",
          backgroundColor: "#e8e4e3",
          border: 3,
          borderColor: "black",
        }}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          If you haven't remember your password kindly fill this form to click
          below, and follow the further instructions.
        </h1>
        <button
          style={{
            width: "80%",
            height: 35,
            border: 0,
            borderRadius: "10px",
            marginLeft: "50px",
            color: "white",
            backgroundColor: "black",
            cursor: "pointer",
          }}
          onClick={handleClickOpen}
        >
          <strong>CLICK HERE</strong>
        </button>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>EMAIL FORM</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your password primarilly fill your email address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={enteredEmailHandler}
            value={passwordEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitEmailHandler}>Submit</Button>
          <Button onClick={signinFormHandler}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}