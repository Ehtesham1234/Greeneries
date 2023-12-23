import React from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Container, Toolbar, Hidden } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";

const DashboardMain = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xlg"));
  const [open, setOpen] = React.useState(matches);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    setOpen(matches);
  }, [matches]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header open={open} toggleDrawer={toggleDrawer} />

      <Hidden mdUp={!open} implementation="css">
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
      </Hidden>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="false"
          sx={{
            mt: 1,
            mb: 4,
            paddingLeft: 1,
            paddingRight: 1,
            "&.MuiContainer-root": {
              paddingLeft: 1,
              paddingRight: 1,
            },
            backgroundColor: theme.palette.background.main,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardMain;
