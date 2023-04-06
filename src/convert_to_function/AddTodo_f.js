import { React, useState } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { PersonalVideo } from "@material-ui/icons";

function AddTodo_f(props) {
  // const [item, setItem] = useState("");
  // const [title, setTitle] = useState("");
  const [item, setItem] = useState({ title: "" });
  const add = props.add;

  const onInputChange = (e) => {
    // console.log(item);
    // console.log("onInputChange");
    // const thisItem = item;
    // thisItem.title = e.target.value;
    // console.log(thisItem.title);
    // setItem(thisItem);
    // console.log(item);
    // console.log(thisItem);
    setItem((prev) => ({ ...prev, title: e.target.value }));
  };
  const onButtonClick = () => {
    console.log("onButtonClick");
    add(item);
    // setItem((prev) => ({ ...prev, title: "" }));
    setItem((prev) => ({ ...prev, title: "" }));
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
            value={item.title}
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

export default AddTodo_f;
// import React from "react";
// import { TextField, Paper, Button, Grid } from "@material-ui/core";

// class AddTodo_f extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { item: { title: "" } };
//     this.add = props.add;
//   }
//   onInputChange = (e) => {
//     console.log("onInputChange");
//     const thisItem = this.state.item;
//     thisItem.title = e.target.value;
//     this.setState({ item: thisItem });
//     // console.log(thisItem);
//   };
//   onButtonClick = () => {
//     console.log("onButtonClick");
//     this.add(this.state.item);
//     this.setState({ item: { title: "" } });
//   };
//   enterKeyEventHandler = (e) => {
//     console.log("enterKeyEventHandler");
//     if (e.key === "Enter") {
//       this.onButtonClick();
//     }
//   };
//   render() {
//     return (
//       <Paper style={{ margine: 16, padding: 16 }}>
//         <Grid container>
//           <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
//             <TextField
//               placeholder="Add Todo here"
//               fullWidth
//               onChange={this.onInputChange}
//               value={this.state.item.title}
//               onKeyPress={this.enterKeyEventHandler}
//             />
//           </Grid>
//           <Grid xs={1} mid={1} item>
//             <Button
//               fullWidth
//               color="secondary"
//               variant="outlined"
//               onClick={this.onButtonClick}
//             >
//               +
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     );
//   }
// }
// export default AddTodo_f;
