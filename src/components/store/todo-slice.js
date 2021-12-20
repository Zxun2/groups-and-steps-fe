import { createSlice } from "@reduxjs/toolkit";
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

export const TodoCreators = (request, ...dataArgs) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const todoData = await request(token, ...dataArgs);

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
          message: err.message || "Something went wrong!",
        })
      );
    }
  };
};

export const todoAction = todoSlice.actions;
export default todoSlice;
