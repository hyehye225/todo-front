import { React, useState } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

function AddTodo(props) {
  super(props);
  // const [item, setItem] = useState("");
  // const [title, setTitle] = useState("");
  const [state, setState] = useState({ item: { title: "" } });
  const add = props.add;

  const onInputChange = (e) => {
    console.log("onInputChange");
    const thisItem = state.item;
    thisItem.title = e.target.value;
    setState({ item: thisItem });
    // console.log(thisItem);
  };
  const onButtonClick = () => {
    console.log("onButtonClick");
    add(state.item);
    setState({ item: { title: "" } });
  };
  const enterKeyEventHandler = (e) => {
    console.log("enterKeyEventHandler");
    if (e.key === "Enter") {
      onButtonClick();
    }
  };

  return (
    <Paper style={{ margine: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            fullWidth
            onChange={onInputChange}
            value={state.title}
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
            +
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddTodo;
