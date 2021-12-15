import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../actions/actionTypes";
import Typography from "@mui/material/Typography";
import { fetchTodoData } from "../store/todo-slice";
import { uiAction } from "../store/ui-slice";

export const Dashboard = (props) => {
  const state = useSelector((state) => state.user);
  const TodoState = useSelector((state) => state.todo);
  const Todo = TodoState.Todo;
  const dispatch = useDispatch();
  const status = state.status;

  useEffect(() => {
    dispatch(fetchTodoData());

    const timer = setTimeout(() => {
      dispatch(uiAction.resetNotification());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  return (
    <div>
      {status === USER_LOGGED_IN && (
        <Typography variant="h1">
          Welcome
          <span style={{ color: "#8d0ada" }}> {state.currUser.name}</span>
          {Todo.map((todo) => {
            return (
              <div key={todo.id}>
                id: {todo.id}, title: {todo.title}
              </div>
            );
          })}
        </Typography>
      )}
      {status === USER_LOGGED_OUT && (
        <Typography variant="h1">Status: {status}</Typography>
      )}
    </div>
  );
};
