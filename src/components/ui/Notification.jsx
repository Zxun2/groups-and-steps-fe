import { makeStyles } from "@material-ui/core";
import { Alert } from "@mui/material";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  notification: {
    width: "100vw",
    display: "flex",
    transition: "all 1s",
  },
}));

const Notification = (props) => {
  const classes = useStyles();
  return (
    <Alert severity={props.status} className={classes.notification}>
      <strong>{props.title}</strong> {props.message}
    </Alert>
  );
};

export default Notification;
