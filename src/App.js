import "./App.css";
import React from "react";
import Hello from "./Hello";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
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
import { call, signout } from "./service/ApiService.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }
  deleteEventHandler = () => {
    console.log("deleteEventHandler called");
    const thisItems = this.state.items;
    console.log(thisItems);
    // this.delete(this.state.item);
    thisItems.map((item) => {
      if (item.done) {
        console.log("delete", item);
        call("/todo", "DELETE", item).then((response) =>
          this.setState({ items: response.data })
        );
      }
    });
  };
  componentDidMount() {
    console.log("componentDidMount 실행됨");
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }
  add = (item) => {
    console.log("add", item);
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };
  delete = (item) => {
    console.log("delete", item);
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };
  // deleteAll = (item) => {
  //   console.log("delete all", item);
  //   call("/todo", "DELETE ", item).then((response) =>
  //     this.setState({ items: response.data })
  //   );
  // };
  update = (item) => {
    console.log("update", item);
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
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
        <>
          <Container maxWidth="md">
            <AddTodo add={this.add} />
            <div className="TodoList">{todoItems}</div>
          </Container>
          <IconButton
            aria-label="Delete"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              margin: "auto",
            }}
            onClick={this.deleteEventHandler}
          >
            Delete Completed Item
            <DeleteOutlined />
          </IconButton>
        </>
      </div>
    );
    var loadingPage = <h1>로딩중..</h1>;
    var content = loadingPage;
    if (!this.state.loading) {
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
}

export default App;
