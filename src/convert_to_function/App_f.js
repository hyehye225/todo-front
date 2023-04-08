import "./App.css";
import { React, useState, useEffect, updateState } from "react";
import Pagination from "../Pagination";
import Todo from "./Todo_f";
import AddTodo from "./AddTodo_f";
// const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
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
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import "./App.css";
import { call, signout } from "./ApiService_f";
function App_f(props) {
  // const [state, setState] = useState({
  //   items: [],
  //   loading: true,
  // });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    console.log("componentDidMount 실행됨");
    call("/todo", "GET", null).then(
      (response) => setItems(response.data),
      // () => {
      //   console.log(items.length);
      // },
      setLoading(false)
      // (response) => console.log(response.data)
      //   (response) =>
      //     setCurrentPage(Math.ceil(response.data.length / itemsPerPage))
    );
    // .then((items) => console.log(items.length));
    console.log(items.length);
    var allItems = items.length;
    var theNumber = itemsPerPage;
    setCurrentPage(Math.ceil(allItems / theNumber));
    // .then(setCurrentPage(Math.ceil(items.length / itemsPerPage) + 1));
    // .then(setCurrentPage(Math.floor(items.length / itemsPerPage) + 1))
    // .then(console.log(currentPage));
    console.log(currentPage);
    // console.log(Math.floor(items.length / itemsPerPage + 1));
    // setCurrentPage(items.length / itemsPerPage + 1);
  }, [items.length]);
  const currentItems = (items) => {
    console.log(items);
    // setPage();
    // setCurrentPage(Math.ceil(items.length / itemsPerPage));
    console.log(currentPage);
    // setCurrentPage(Math.ceil(items.length / itemsPerPage));
    let indexOfLastItem = currentPage * itemsPerPage;
    // let indexOfLastItem = items.length - (currentPage - 1) * itemsPerPage;
    // 15-1-
    // this.setState({indexOfLastItem:currentPage *itemsPerPage});
    //   첫번째 item의 index는 10-1- items.length/itemsPerPage
    //14개 있으면 currentPage가 1일때 5 10-14이어야 함(최신순)
    //2일때 5 5-9
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //   0~10까지 자른다
    let currentItems = 0;
    currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentItems);
    return currentItems;
  };
  const deleteEventHandler = () => {
    console.log("deleteEventHandler called");
    const thisItems = items;
    console.log(thisItems);
    // this.delete(this.state.item);
    thisItems.map((item) => {
      if (item.done) {
        console.log("delete", item);
        call("/todo", "DELETE", item).then((response) =>
          setItems(response.data)
        );
      }
    });
    // setCurrentPage(Math.ceil(items.le
    // ngth / itemsPerPage));
  };
  const add = (item) => {
    console.log("add", item);
    call("/todo", "POST", item).then((response) => setItems(response.data));
    // var allItems = items.length;
    // var theNumber = itemsPerPage;
    // setCurrentPage(Math.ceil(allItems / theNumber));
    // .then(
    //   console.log(items.length),
    //   setCurrentPage(Math.ceil(items.length / itemsPerPage))
    // );
    // console.log(items.length);
    // setCurrentPage(Math.ceil(items.length / itemsPerPage));
    // forceUpdate();
  };
  // const setPage = (items, itemsPerPage) => {
  //   var allItems = items.length;
  //   var theNumber = itemsPerPage;
  //   setCurrentPage(Math.ceil(allItems / theNumber));
  // };
  const deletee = (item) => {
    console.log("delete", item);
    call("/todo", "DELETE", item).then((response) => setItems(response.data));

    // setCurrentPage(Math.ceil(items.length / itemsPerPage));
    // console.log(currentPage)

    //     .then(
    //       console.log(items.length),
    //       setCurrentPage(Math.ceil(items.length / itemsPerPage)),
    //       console.log("setCurrentPage")
    //     )
    //     .then(console.log(currentPage));
  };
  const update = (item) => {
    console.log("update", item);
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo item={item} key={item.id} deletee={deletee} update={update} />
        ))}
      </List>
    </Paper>
  );
  var todoCurrentItems = currentItems(items).length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {currentItems(items).map((item, idx) => (
          <Todo item={item} key={item.id} deletee={deletee} update={update} />
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
        <AddTodo
          add={add}
          // paginate={setCurrentPage(Math.ceil(items.length / itemsPerPage))}
        />
        <div className="TodoList">
          {/* {todoItems} */}
          {todoCurrentItems}
          {/* <Pagination
            postsPerPage={itemsPerPage}
            totalPosts={items.length}
            paginate={setCurrentPage}
          ></Pagination> */}
        </div>
      </Container>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <Pagination
          postsPerPage={itemsPerPage}
          totalPosts={items.length}
          paginate={setCurrentPage}
        ></Pagination>
      </div>
      <IconButton
        aria-label="Delete"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
        }}
        onClick={deleteEventHandler}
      >
        Delete Completed Item
        <DeleteOutlined />
      </IconButton>
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
