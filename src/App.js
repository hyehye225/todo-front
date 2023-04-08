import "./App.css";
import React from "react";
import Hello from "./Hello";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Pagination from "./Pagination";
import styled from "styled-components";
// import Pagination from "react-js-pagination";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import Posts from "./Posts";
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
import { SettingsBackupRestoreRounded } from "@material-ui/icons";
class App extends React.Component {
  constructor(props) {
    super(props);
    // this.setState = this.setState.bind(this);
    this.state = {
      items: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 5,
      // indexOfFirstItem: 0,
      // indexOfLastItem: 0,
    };
  }

  // indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
  // // this.setState({indexOfLastItem:currentPage *itemsPerPage});
  // //   첫번째 item의 index는 10-1-
  // indexOfFirstItem = this.state.indexOfLastItem - this.state.itemsPerPage;
  // //   0~10까지 자른다
  currentItems = (items) => {
    console.log(items);
    console.log(this.state.currentPage);
    let indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    // this.setState({indexOfLastItem:currentPage *itemsPerPage});
    //   첫번째 item의 index는 10-1-
    let indexOfFirstItem = this.state.indexOfLastItem - this.state.itemsPerPage;
    //   0~10까지 자른다
    let currentItems = 0;
    currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentItems);
    return currentItems;
  };
  profile = () => {
    console.log("회원정보 수정");
    // console.log(this.state.)
  };
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

    // this.setState({
    //   indexOfLastItem: this.state.currentPage * this.state.itemsPerPage,
    // });
    // console.log(this.indexOfLastItem);
    // console.log(this.state.currentPage);
    // indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
    // //   첫번째 item의 index는 10-1-
    // indexOfFirstItem = this.state.indexOfLastItem - this.state.itemsPerPage;
    // //   0~10까지 자른다
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
    console.log(this.state.items);
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
    // this.currentItems(this.state.items)
    var todoCurrentItems = this.currentItems(this.state.items).length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.currentItems(this.state.items).map((item, idx) => (
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
              <Button color="inherit" onClick={this.profile}>
                {" "}
                회원정보 수정
              </Button>
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
            {/* 페이징 적용할 부분 */}
            <div className="TodoList">
              {todoItems}
              {/* {todoCurrentItems} */}
              {/* <Posts
                items={this.currentItems(this.state.items)}
                loading={this.state.loading}
              ></Posts>  */}
              {/* <Todo
                items={this.currentItems(this.state.items)}
                loading={this.state.loading}
              ></Todo> */}
              {/* <Pagination
                postsPerPage={this.state.itemsPerPage}
                totalPosts={this.state.items.length}
                paginate={this.setState}
              ></Pagination> */}
            </div>
            {/* <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                margin: "auto",
              }}
              postsPerPage={this.state.itemsPerPage}
              totalPosts={this.state.items.length}
              setState={this.setState}
            ></Pagination> */}
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
