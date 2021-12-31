import { createSlice } from "@reduxjs/toolkit";

/**
 * createSlice will return an object that looks like this
 * {
 *  name: string,
 *  reducer: ReducerFunction,
 *  actions: Record<string, ActionCreator>
 *  caseReducers: Record<string, CaseReducer>,
 *  getInitialState: () => State
 * }
 */

interface Todo {
  created_at: Date;
  created_by: string;
  id: number;
  title: string;
  updated_at: Date;
}

interface TodoState {
  Todo: Todo[];
  changed: boolean;
}

const todoSlice = createSlice({
  // A name used in action types
  name: "todo",
  // The initial state
  initialState: {
    Todo: [], // Todo[]
    changed: false,
  },
  // An object of "case reducers". Key names will be used to generate actions.
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

export const todoAction = todoSlice.actions;
export default todoSlice;
