import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../actions/apiUrl";
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
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Could not fetch Todo data!");
      }

      const todos = await response.json();

      return todos;
    };

    try {
      const todoData = await fetchData();

      dispatch(
        todoAction.replaceTodo({
          Todo: todoData || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching todo data failed!",
        })
      );
    } catch (err) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching todo data failed!",
        })
      );
    }
  };
};

export const todoAction = todoSlice.actions;
export default todoSlice;
