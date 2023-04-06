import { React, useState } from "react";
import "./index.css";
import App from "./App";
import Login from "./Login_f";
import SignUp from "./SignUp_f";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright"}
      fsoftwareengineer,{new Date().getFullYear()}
    </Typography>
  );
}
function AppRouter() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<App />} />
        </Routes>
      </div>
      <div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
