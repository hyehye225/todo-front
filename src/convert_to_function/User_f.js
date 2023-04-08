import { React, useEffect, useState } from "react";
// import { React, useState } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import {
  call,
  RetrieveUser,
  signout,
  callGet,
  updateuserinfo,
} from "./ApiService_f";
import { StarRate } from "@material-ui/icons";
// export const SaveEmail = (tempemail) => {
//   // console.log(userTemp);
//   const [email, setEmail] = useState("");
//   setEmail(tempemail);
//   // setUser({ email: email });
//   console.log(email);
//   // return call("/auth/profile", "GET", email).then((response) => {
//   //   if (response) {
//   //     console.log(response);
//   //   }
//   // });
//   return email;
// };
function User_f(props) {
  const [user, setUser] = useState({});
  const update = props.update;
  const onNameChange = (e) => {
    setUser((prev) => ({ ...prev, username: e.target.value }));
  };
  const onIdChange = (e) => {
    setUser((prev) => ({ ...prev, id: e.target.value }));
  };
  const onPasswordChange = (e) => {
    setUser((prev) => ({ ...prev, password: e.target.value }));
  };
  // const saveUser = () => var email=};
  useEffect(() => {
    // signin
    authenticate();
  }, []);
  const onButtonClick = () => {
    console.log("onButtonClick");
    // RetrieveUser(user);
    // setItem((prev) => ({ ...prev, title: "" }));
    setUser((prev) => ({ id: "", password: "", username: "" }));
    // updateuserinfo(user);
    console.log(user);
  };
  const enterKeyEventHandler = (e) => {
    console.log("enterKeyEventHandler");
    if (e.key === "Enter") {
      onButtonClick();
    }
  };
  const authenticate = () => {
    var email = localStorage.getItem("email");
    // const [user,setUser]=useState({});
    console.log(email);
    // const [user, setUser] = useState({});
    // var email = email;
    // console.log("Retrieving user...", email);
    return callGet("/auth/profile?", "GET", email).then((response) => {
      if (response.id) {
        console.log(response);
        setUser({
          username: response.username,
          email: response.email,
          password: response.password,
          id: response.id,
        });
        // return response;
      } else {
        console.log("오류 발생");
      }
    });
  };
  return (
    <Paper style={{ margine: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            label={"사용자 이름: " + user.username}
            fullWidth
            id="outlined-required"
            onChange={onNameChange}
            // value={user.username}
            onKeyPress={enterKeyEventHandler}
          />
          <TextField
            label={"아이디: " + user.id}
            fullWidth
            id="outlined-required"
            onChange={onIdChange}
            // value={user.id}
            onKeyPress={enterKeyEventHandler}
          />
          <TextField
            label={"비밀번호: " + user.password}
            fullWidth
            id="outlined-required"
            onChange={onPasswordChange}
            // value={user.password}
            onKeyPress={enterKeyEventHandler}
          />
        </Grid>
        <Grid xs={1} mid={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            수정
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default User_f;
