import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

import "./App.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      {/* https://mui.com/material-ui/react-app-bar/ */}
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
          </Typography>
          <Typography variant="h6" color="inherit" component="div">
            <Button color="inherit" component={RouterLink} to="/users">
              Users
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
