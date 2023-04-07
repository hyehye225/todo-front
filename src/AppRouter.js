import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
// import Login from "./convert_to_function/Login_f";
// import SignUp from "./convert_to_function/SignUp_f";
// import App from "./convert_to_function/App_f";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
function Copyright(props) {
  const deletee = props.delete;

  const deleteEventHandler = () => {
    console.log("deleteEventHandler called");
    // this.delete(this.state.item);
  };
  return (
    <>
      {" "}
      {/* <IconButton
        aria-label="Delete"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={deleteEventHandler}
      >
        Delete Completed Item
        <DeleteOutlined />
      </IconButton> */}
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright"}
        fsoftwareengineer,{new Date().getFullYear()}
      </Typography>
    </>
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
