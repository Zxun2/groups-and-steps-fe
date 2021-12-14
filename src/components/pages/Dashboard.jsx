import React from "react";
import { useSelector } from "react-redux";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../actions/actionTypes";
import Typography from "@mui/material/Typography";

export const Dashboard = (props) => {
  const state = useSelector((state) => state.user);
  const status = state.status;

  return (
    <div>
      {status === USER_LOGGED_IN && (
        <Typography variant="h1">
          Welcome
          <span style={{ color: "#8d0ada" }}> {state.currUser.name}</span>
        </Typography>
      )}
      {status === USER_LOGGED_OUT && (
        <Typography variant="h1">Status: {status}</Typography>
      )}
    </div>
  );
};
