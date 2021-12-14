import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../../actions/actionTypes";
import Typography from "@mui/material/Typography";
import { fetchTodoData } from "../store/todo-slice";
import { userAction } from "../store/user-slice";

export const Dashboard = (props) => {
  const state = useSelector((state) => state.user);
  const TodoState = useSelector((state) => state.todo);
  const Todo = TodoState.Todo;
  const dispatch = useDispatch();
  const status = state.status;

  // Auto Login
  // TODO: REFACTOR THIS TO A HOOOK OR SMT
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3001/auth/auto_login", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          dispatch(
            userAction.logUserIn({
              user: data,
              token,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, props]);

  useEffect(() => {
    dispatch(fetchTodoData());
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
