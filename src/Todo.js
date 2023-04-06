import React from "react";
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
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true };
    this.delete = props.delete;
    this.update = props.update;
  }
  deleteEventHandler = () => {
    console.log("deleteEventHandler called");
    this.delete(this.state.item);
  };
  offReadOnlyMode = () => {
    console.log("offReadOnlyMode called");
    // console.log("Event!", this.state.readOnly);
    this.setState({ readOnly: false }, () => {
      console.log("ReadOnly?", this.state.readOnly);
    });
  };
  enterKeyEventHandler = (e) => {
    console.log("enterKeyEventHandler");
    if (e.key === "Enter") {
      this.setState({ readOnly: true });
      this.update(this.state.item);
    }
  };
  editEventHandler = (e) => {
    console.log("editEventHandler");
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  };
  checkboxEventHandler = (e) => {
    console.log("checkboxEventHandler");
    const thisItem = this.state.item;
    thisItem.done = thisItem.done ? false : true;
    // this.setState({ item: thisItem });
    this.setState({ readOnly: true });
    this.update(this.state.item);
    console.log("check box event call");

    // console.log("업데이트 후");
  };

  render() {
    const item = this.state.item;
    return (
      <ListItem>
        <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
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
            onClick={this.offReadOnlyMode}
            onChange={this.editEventHandler}
            onKeyPress={this.enterKeyEventHandler}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
            <DeleteOutlined />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
export default Todo;
