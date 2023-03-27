import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, TextField, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserDataAction, updateUserProfileAction } from "../reducer/asyncAuthReducer";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const headerStyle = { margin: 0 };

  const [enteredName, setEnteredName] = useState("");
  const [enteredUrl, setEnteredUrl] = useState("");

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };
  const photoUrlHandler = (e) => {
    setEnteredUrl(e.target.value);
  };
    const getUserData=()=>{
      setTimeout(()=>{dispatch(getUserDataAction())},1500);
    }

  const saveButtonHandler = (e) => {
    e.preventDefault();
    const editFormObj = {
      name: enteredName,
      url: enteredUrl,
    };
    dispatch(updateUserProfileAction(editFormObj));

    navigate('/mailboxmainpage')
    setEnteredName("");
    setEnteredUrl("");
    console.log(editFormObj);
    getUserData();
  };
  const cancelButtonHandler = () => {
    navigate("/mailboxmainpage");
  };

  return (
    <Grid>
      <Paper
        elevation={20}
        sx={{
          padding: "30px 20px",
          width: 400,
          margin: "20px auto",
          boxShadow: "5px 5px 5px #353738",
        }}
      >
        <Grid align="center">
          <Avatar
            sx={{
              backgroundColor: "#25becc",
              boxShadow: "4px 4px 4px #3d6a6e",
            }}
          >
            <ManageAccountsIcon />
          </Avatar>
          <h2 style={headerStyle}>Update Profile</h2>
          <b>
            <Typography variant="caption">
              Please fill this form to update profile !
            </Typography>
          </b>
          <hr />
        </Grid>
        <form>
          <TextField
            fullWidth
            label="User Name"
            placeholder="Enter name"
            onChange={nameChangeHandler}
            value={enteredName}
          />
          &nbsp;
          <TextField
            fullWidth
            label="Photo URL"
            placeholder="Enter url"
            onChange={photoUrlHandler}
            value={enteredUrl}
          />
          <Stack
            spacing={2}
            mt={1}
            justifyContent="space-between"
            direction="row"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ boxShadow: "4px 4px 4px #a5baf0" }}
              onClick={saveButtonHandler}
            >
              SAVE
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ boxShadow: "4px 4px 4px #f09999" }}
              onClick={cancelButtonHandler}
            >
              CANCEL
            </Button>
          </Stack>
        </form>
      </Paper>
    </Grid>
  );
};

export default UpdateProfileForm;
