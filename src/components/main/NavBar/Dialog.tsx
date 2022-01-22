import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";

type DialogProps = {
  open: boolean;
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
  handleClose: () => void;
  todoRef: React.MutableRefObject<HTMLInputElement | null>;
  dialogValue: {
    title: string;
  };
  setDialogValue: React.Dispatch<
    React.SetStateAction<{
      title: string;
    }>
  >;
};

const DialogComponent: React.FC<DialogProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      style={{ margin: "0" }}
    >
      <Box style={{ backgroundColor: "#36393f" }}>
        <DialogTitle
          color="white"
          style={{ textAlign: "center", fontSize: "30px" }}
        >
          Add a new group
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="white">
            Are you looking for a Group not in the list? Please, add it!
          </DialogContentText>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "revert",
              margin: "2rem",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={props.dialogValue.title}
              onChange={(event) =>
                props.setDialogValue({
                  ...props.dialogValue,
                  title: event.target.value,
                })
              }
              type="text"
              variant="standard"
              // @ts-ignore
              component="form"
              onSubmit={props.handleSubmit}
              InputProps={{
                style: { color: "white", fontSize: "1.05rem" },
              }}
              inputRef={props.todoRef}
            />
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default DialogComponent;
