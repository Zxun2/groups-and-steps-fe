import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { todoModalStyle } from "../ui/Style";

function TodoModal(props) {
  const classes = todoModalStyle();
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box className={classes.modal}>
        <Typography
          style={{ fontWeight: "600", textAlign: "center", margin: "1rem" }}
          variant="h5"
          color="secondary"
        >
          Change your title
        </Typography>
        <Typography
          style={{ fontWeight: "400", textAlign: "center", color: "#cccccc" }}
          variant="subtitle1"
        >
          Enter your new title below or click the delete button to delete Todo.
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "revert",
            margin: "2rem",
          }}
        >
          <TextField
            id="title"
            component="form"
            className={classes.input}
            color="secondary"
            size="large"
            onChange={props.updateTodoChangeHandler}
            onSubmit={props.updateTodoHandler}
            variant="filled"
          />

          <Button
            variant="outlined"
            color="error"
            style={{ marginTop: "2rem" }}
            startIcon={<DeleteIcon />}
            onClick={props.deleteTodoHandler.bind(null, props.todoId)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default TodoModal;
