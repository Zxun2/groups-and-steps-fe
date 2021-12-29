import { createSlice } from "@reduxjs/toolkit";
// import { uiAction } from "./ui-slice";

// TO ADD: interfaces for initial state

// A function that accepts an initial state, an object of reducer functions,
// and a "slice name", and automatically generates action creators and action types
// that correspond to the reducers and state.

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

/**
 * interface Todo {
 *  created_at: Date;
 *  created_by: string;
 *  id: number;
 *  title: string;
 *  updated_at: Date;
 * }
 */

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

// export const TodoCreators = (request, ...dataArgs) => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");

//     try {
//       const todoData = await request(token, ...dataArgs);

//       if (todoData.status === 422) {
//         throw new Error(todoData.message);
//       }

//       dispatch(
//         todoAction.replaceTodo({
//           Todo: todoData.todos || [],
//         })
//       );

//       dispatch(
//         uiAction.showNotification({
//           status: "success",
//           title: "Success!",
//           message: todoData.message,
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiAction.showNotification({
//           status: "error",
//           title: "Error!",
//           message: err.message || "Something went wrong!",
//         })
//       );
//     }
//   };
// };

export const todoAction = todoSlice.actions;
export default todoSlice;
