import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";


import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import SendRoundedIcon from "@mui/icons-material/SendRounded";


import Menu from "@mui/material/Menu";

import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Grid, Paper } from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../reducer/authSlice";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { mailBoxDataActions } from "../reducer/mailBoxSlice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MailBoxMainPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.auth.userProfileData);

  console.log(profileData);
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const updateProfileFormHandler = () => {
    navigate("/updateprofileform");
  };
  const loginFormHandler = () => {
    dispatch(authSliceActions.userLogOut());
    navigate("/");
  };
  const signOutButtonHandler = () => {
    dispatch(authSliceActions.userLogOut());
    dispatch(mailBoxDataActions.userLogout());
    navigate("/");
  };
  const composeFormHandler = () => {
    dispatch(mailBoxDataActions.composeMailFormOpen());
  };
  const inboxListOpenHandler = () => {
    dispatch(mailBoxDataActions.inboxListOpen());
  };
  const outboxListOpenHandler = () => {
    dispatch(mailBoxDataActions.outboxListOpen());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mail Box Client
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {profileData ? (
                  <Avatar src={profileData.photoUrl} />
                ) : (
                  <Avatar src="/broken-image.jpg" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ width: 370, height: 300, backgroundColor: "#b9d7fa" }}
              >
                <Box>
                  <Paper
                    elevation={20}
                    sx={{
                      padding: "80px 10px",
                      width: 340,
                      height: 40,
                      margin: "25px auto",
                      mt: -13,
                      boxShadow: "5px 5px 5px #353738",
                    }}
                  >
                    {profileData ? (
                      <Avatar
                        src={profileData.photoUrl}
                        sx={{ height: "70px", width: "70px", ml: 0, mt: -8 }}
                      />
                    ) : (
                      <Avatar
                        src="/broken-image.jpg"
                        sx={{ height: "70px", width: "70px", ml: 0, mt: -8 }}
                      />
                    )}

                    <div>
                      {" "}
                      <h1>
                        <Typography sx={{ fontSize: 19, mt: -10, ml: 11 }}>
                          {profileData && profileData.displayName}
                        </Typography>
                      </h1>
                    </div>
                    <h4>
                      <Typography sx={{ fontSize: 15, mt: -3, ml: 11 }}>
                        {profileData && profileData.email}
                      </Typography>
                    </h4>
                    <h2
                      style={{
                        borderStyle: "solid",
                        borderWidth: "1.7px",
                        borderRadius: "5px",
                        marginLeft: "75px",
                        marginRight: "40px",
                      }}
                    >
                      <Typography
                        onClick={updateProfileFormHandler}
                        sx={{ fontSize: 17, mt: 0, ml: 1.5 }}
                      >
                        Manage your Account
                      </Typography>
                    </h2>
                  </Paper>
                </Box>
                <Box>
                  <Paper
                    onClick={signOutButtonHandler}
                    elevation={30}
                    sx={{
                      padding: "30px 20px",
                      width: 340,
                      height: 30,
                      boxShadow: "4px 4px 4px #353738",
                      mt: 28,
                      ml: -42.5,
                    }}
                  >
                    <LogoutOutlinedIcon
                      sx={{ mt: -2, width: 30, height: 30 }}
                    />
                    <Typography sx={{ fontSize: 18, ml: 10, mt: -4.5 }}>
                      Sign out
                    </Typography>
                  </Paper>
                </Box>
                <Box>
                  <Paper
                    onClick={loginFormHandler}
                    elevation={30}
                    sx={{
                      padding: "30px 20px",
                      width: 340,
                      height: 30,
                      boxShadow: "3px 3px 3px #353738",
                      mt: 12,
                      ml: -42.5,
                    }}
                  >
                    <PersonAddAltOutlinedIcon
                      sx={{ mt: -2, width: 30, height: 30 }}
                    />
                    <Typography sx={{ fontSize: 18, ml: 10, mt: -4.5 }}>
                      Add another account
                    </Typography>
                  </Paper>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Paper
          onClick={composeFormHandler}
          sx={{
            boxShadow:
              " 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)",
            backgroundColor: "#4ed6f5",
            height: 65,
            mt: 3.5,
            cursor: "pointer",
          }}
          elevation={30}
        >
          <EditSharpIcon
            sx={{ ml: 1, mt: 1.3, mb: 1, width: 50, height: 50 }}
          />
          <Typography sx={{ ml: 10, mt: -7, mb: 1, fontSize: "25px" }}>
            Compose
          </Typography>
        </Paper>
        <Divider sx={{ height: 10 }} />

        <List>
          <ListItem
            disablePadding
            onClick={inboxListOpenHandler}
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 30,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InboxRoundedIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>Inbox</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 30,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <StarBorderTwoToneIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                Starred
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem
            disablePadding
            onClick={outboxListOpenHandler}
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 30,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SendRoundedIcon />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                Sent Box
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
