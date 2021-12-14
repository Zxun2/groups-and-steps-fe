import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    Todo: [], // Todo[]
    steps: [], // Object[]
    changed: false,
  },
  reducers: {
    addNewTodo(state, action) {
      state.Todo.push(action.payload.Todo);
    },
    removeTodo(state, action) {
      state.Todo.filter((obj) => obj.id !== action.payload.id);
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

export const todoActions = todoSlice.actions;
export default todoSlice;
