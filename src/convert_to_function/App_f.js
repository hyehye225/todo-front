import "./App.css";
import { React, useState, useEffect } from "react";

import Todo from "./Todo_f";
import AddTodo from "./AddTodo_f";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import "./App.css";
import { call, signout } from "./ApiService_f";
function App_f(props) {
  // const [state, setState] = useState({
  //   items: [],
  //   loading: true,
  // });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("componentDidMount 실행됨");
    call("/todo", "GET", null).then(
      (response) => setItems(response.data),
      setLoading(false)
    );
  }, []);

  const add = (item) => {
    console.log("add", item);
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };
  const deletee = (item) => {
    console.log("delete", item);
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };
  const update = (item) => {
    console.log("update", item);
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo item={item} key={item.id} delete={deletee} update={update} />
        ))}
      </List>
    </Paper>
  );
  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              {" "}
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  var todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
  var loadingPage = <h1>로딩중..</h1>;
  var content = loadingPage;
  if (!loading) {
    content = todoListPage;
  }
  return <div className="App">{content}</div>;

  // return (
  //   <div className="App">
  //     {/* <Container maxWidth="md">
  //       <AddTodo add={this.add} />
  //       <div className="TodoList">{todoItems}</div>
  //     </Container> */}
  //     {content}
  //   </div>
  // );
}

export default App_f;
