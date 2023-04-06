import React from "react";
import "./index.css";
// import App from "./App";
// import Login from "./Login";
// import SignUp from "./SignUp";
import Login from "./convert_to_function/Login_f";
import SignUp from "./convert_to_function/SignUp_f";
import App from "./convert_to_function/App_f";
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
class AppRouter extends React.Component {
  render() {
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
}
export default AppRouter;
