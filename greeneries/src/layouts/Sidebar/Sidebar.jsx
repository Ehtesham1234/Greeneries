import React from "react";
import { styled } from "@mui/material/styles";
import { Hidden, Divider, IconButton, List, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MuiDrawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
// import { navigationLinkAdmin } from "../../data/data";
// import { navigationLinkSuperAdmin } from "../../data/data";
import { NavLink } from "react-router-dom";
import ToggleColorMode from "../../Components/ToggleColorMode/ToggleColorMode";
const drawerWidth = 240;

// const StyledDrawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: "0px",
//       // theme.spacing(7),
//       // [theme.breakpoints.up("sm")]: {
//       //   width: theme.spacing(9),
//       // },
//     }),
//   },
// }));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    zIndex: 9999, // Add this line to set the z-index
    backgroundColor: theme.palette.primary.main,
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: "0px",
    }),
  },
}));

const Sidebar = ({ open, toggleDrawer }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user ? user.userType : null;
  //   const navigationLinks =
  //     userType === "admin" ? navigationLinkAdmin : navigationLinkSuperAdmin;

  const mainListItems = (
    <React.Fragment>
      {/* {navigationLinks.map((navigationLink) => (
        <ListItemButton
          key={navigationLink.id}
          component={NavLink}
          to={navigationLink.path}
          className="nav-link"
          activeclassname="active"
        >
          <ListItemIcon>{navigationLink.icon}</ListItemIcon>
          <ListItemText primary={navigationLink.title} />
        </ListItemButton>
      ))} */}
      <ToggleColorMode />
    </React.Fragment>
  );

  const secondaryListItems = (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
    </React.Fragment>
  );

  return (
    <>
      <Hidden mdUp={!open} implementation="css">
        <StyledDrawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </StyledDrawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
