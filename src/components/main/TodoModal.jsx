import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { makeStyles, Typography } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.tertiary,
    boxShadow: 24,
    borderRadius: "4px",
    p: 4,
    padding: "4rem",
  },
  input: {
    "& .MuiFilledInputInput": {
      color: theme.palette.secondary.main,
    },
  },
}));

function TodoModal(props) {
  const classes = useStyles();
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
