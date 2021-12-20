import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, fetchData, updateTodo } from "../lib/api";
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
// todoCreators(fetchdata)
export const fetchTodoData = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const todoData = await fetchData(token);

      if (todoData.status === 422) {
        throw new Error(todoData.message);
      }

      dispatch(
        todoAction.replaceTodo({
          Todo: todoData.todos || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: todoData.message,
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

// ADD TODO
// todoCreators(addTodo, todoData)
export const addTodoData = (todo) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      console.log(todo);
      const todoData = await addTodo(token, todo);

      if (todoData.status === 422) {
        throw new Error(todoData.message);
      }

      dispatch(
        todoAction.replaceTodo({
          Todo: todoData.todos || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: todoData.message,
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

// todoCreators(addTodo, id, content)
export const updateTodoData = (id, content) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const todoData = await updateTodo(token, id, content);

      dispatch(
        todoAction.replaceTodo({
          Todo: todoData.todos || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: todoData.message,
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

export const deleteTodoData = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const todoData = await deleteTodo(token, id);

      dispatch(
        todoAction.replaceTodo({
          Todo: todoData.todos || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: todoData.message,
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
