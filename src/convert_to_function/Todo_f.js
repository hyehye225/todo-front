import { React, useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { call, signout } from "./service/ApiService.js";
function Todo(props) {
  super(props);
  const [state, setState] = useState({ item: props.item, readOnly: true });
  const deletee = props.deletee;
  const update = props.update;

  const deleteEventHandler = () => {
    console.log("deleteEventHandler called");
    deletee(state.item);
  };
  const offReadOnlyMode = () => {
    console.log("offReadOnlyMode called");
    // console.log("Event!", this.state.readOnly);
    setState({ readOnly: false }, () => {
      console.log("ReadOnly?", state.readOnly);
    });
  };
  const enterKeyEventHandler = (e) => {
    console.log("enterKeyEventHandler");
    if (e.key === "Enter") {
      setState({ readOnly: true });
      update(state.item);
    }
  };
  const editEventHandler = (e) => {
    console.log("editEventHandler");
    const thisItem = state.item;
    thisItem.title = e.target.value;
    setState({ item: thisItem });
  };
  const checkboxEventHandler = (e) => {
    console.log("checkboxEventHandler");
    const thisItem = state.item;
    thisItem.done = thisItem.done ? false : true;
    // this.setState({ item: thisItem });
    setState({ readOnly: true });
    update(state.item);
    console.log("check box event call");

    // console.log("업데이트 후");
  };

  const item = state.item;
  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: this.state.readOnly,
          }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onChange={editEventHandler}
          onKeyPress={enterKeyEventHandler}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
