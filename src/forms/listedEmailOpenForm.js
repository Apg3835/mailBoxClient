import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { mailBoxDataActions } from "../reducer/mailBoxSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListedEmailOpenForm() {
  const dispatch = useDispatch();
  const inboxMailOpen = useSelector(
    (state) => state.mailBoxClient.listedEmailOpenForm
  );
  const mail = useSelector((state) => state.mailBoxClient.email);
  console.log(mail);

  const handleClose = () => {
    dispatch(mailBoxDataActions.closelistedEmailForm());
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={inboxMailOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Close
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              {mail.date}
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemText primary="Subject" secondary={mail.subject} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Body"
              secondary={mail.content}
              style={{ wordWrap: "break-word" }}
            />
          </ListItem>
          {mail.recipientEmail ? (
            <ListItem>
              <ListItemText />
              To :{mail.recipientEmail}
            </ListItem>
          ) : (
            <ListItem>
              <ListItemText />
              From :{mail.senderEmail}
            </ListItem>
          )}
        </List>
      </Dialog>
    </div>
  );
}
