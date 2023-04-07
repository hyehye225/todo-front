import { React, useEffect, useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import { call, signout } from "./ApiService_f";
import { StarRate } from "@material-ui/icons";
function Todo_f(props) {
  // const [state, setState] = useState({ item: props.item, readOnly: true });
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const [checked, setChecked] = useState([]);
  const deletee = props.deletee;
  const update = props.update;

  const deleteEventHandler = () => {
    console.log("deleteEventHandler called");
    deletee(item);
  };
  const offReadOnlyMode = () => {
    console.log("offReadOnlyMode called");
    // console.log("Event!", this.state.readOnly);
    setReadOnly(false);
  };
  const enterKeyEventHandler = (e) => {
    // console.log(readOnly);
    console.log("enterKeyEventHandler");
    if (e.key === "Enter") {
      setReadOnly(true);
      update(item);
    }
  };
  // useEffect(
  //   (e) => {
  //     console.log("editEventHandler");
  //     const thisItem = item;
  //     console.log(thisItem);
  //     thisItem.title = e.target.value;
  //   },
  //   [item]
  // );
  useEffect(() => {
    console.log(item);
  }, [item]);
  const editEventHandler = (e) => {
    console.log("editEventHandler");
    // const thisItem = item;
    // console.log(thisItem);
    // thisItem.title = e.target.value;
    // console.log(e.target.value);

    setItem((prev) => ({ ...prev, title: e.target.value }));
  };
  const checkboxEventHandler = (e) => {
    console.log("checkboxEventHandler");

    const thisItem = item;

    thisItem.done = thisItem.done ? false : true;
    // this.setState({ item: thisItem });
    setReadOnly(true);

    update(item);

    console.log("check box event call");
    console.log(item);
    setChecked((previousState) => [...previousState, item.title]);
    console.log(checked);
    // console.log("업데이트 후");
  };

  // console.log(item);
  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{
            "aria-label": "naked",
            readOnly: readOnly,
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

export default Todo_f;
