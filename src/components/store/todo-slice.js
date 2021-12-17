import { createSlice } from "@reduxjs/toolkit";
import { addTodo, fetchData } from "../lib/api";
import { uiAction } from "./ui-slice";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    Todo: [], // Todo[]
    changed: false,
  },
  reducers: {
    replaceTodo(state, action) {
      state.Todo = action.payload.Todo;
    },
    addNewTodo(state, action) {
      const newTodo = action.payload;
      state.changed = true;
      state.Todo.push({
        id: newTodo.id,
        title: newTodo.title,
      });
    },
    removeTodo(state, action) {
      state.changed = true;
      const id = action.payload;
      state.Todo.filter((obj) => obj.id !== id);
    },
    updateTodo(state, action) {
      const objIndex = state.Todo.findIndex(
        (obj) => obj.id === action.payload.id
      );
      state.Todo[objIndex] = {
        ...state.Todo[objIndex],
        title: action.payload.title,
      };
    },
  },
});

// Action creators
export const fetchTodoData = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const todoData = await fetchData(token);

      dispatch(
        todoAction.replaceTodo({
          Todo: todoData || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Todo data is fetched successfully!",
        })
      );
    } catch (err) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: err.message,
        })
      );
    }
  };
};

export const addTodoData = (todoData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(
      uiAction.showNotification({
        status: "Notice",
        title: "Sending...",
        message: "Sending Todo data!",
      })
    );

    try {
      const newTodoData = await addTodo(todoData, token);

      dispatch(
        todoAction.replaceTodo({
          Todo: newTodoData || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Added Todo successfully!",
        })
      );
    } catch (err) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: err.message,
        })
      );
    }
  };
};

export const todoAction = todoSlice.actions;
export default todoSlice;
