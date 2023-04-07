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
import { unstable_HistoryRouter } from "react-router-dom";
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true, checked: [] };
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
    // console.log(this.state.item.done);
    // if (this.state.item.done === true) {
    //   const checkedList = [...this.state.checkedList, this.state.item.title];
    //   this.setState({ checkedList: checkedList });
    //   console.log(this.state.checkedList);
    // }
    // var updatedList = [...this.state.checked];
    // console.log(updatedList);
    // console.log(this.state.item.title);
    // if (e.target.checked) {
    //   console.log(this.state.item.title);
    //   updatedList = [...this.state.checked, e.target.value];
    //   // updatedList.push(this.state.item.title);
    //   console.log(updatedList);
    // }
    // if (e.target.checked) {
    //   console.log(e.target.value);
    //   console.log(this.state.checked);
    //   updatedList = [...this.state.checked, e.target.value];
    //   // updatedList.push(e.target.value);
    //   console.log(updatedList);
    // } else {
    //   updatedList.splice(this.state.checked.indexOf(e.target.value), 1);
    // }
    // console.log(updatedList);
    // this.setState({ checked: updatedList });
    // this.setState({
    //   checked: {
    //     ...this.state.checked,
    //     // hospital_id: 1,
    //     updatedList,
    //   },
    // });
    // console.log(this.state.checked);

    // this.setState({ checked: updatedList });
    // this.setState(previousState => [...previousState, this.state.item.title])
    // console.log(this.state.checked);
    // // console.log("업데이트 후");
    //   this.setState(
    //     (previousState) => (
    //       ({
    //         checked: [...previousState.checked, e.target.value],
    //       }),
    //       (this.state.checked) => console.log(this.state.checked)
    //     )
    //   );
  };

  render() {
    const item = this.state.item;
    return (
      <ListItem>
        <Checkbox
          checked={item.done}
          value={item.title}
          onChange={this.checkboxEventHandler}
        />
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
