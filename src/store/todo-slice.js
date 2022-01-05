import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../misc/base-url";

// TO ADD: interfaces for initial state
/**
 * interface Todo {
 *  created_at: Date;
 *  created_by: string;
 *  id: number;
 *  title: string;
 *  updated_at: Date;
 * }
 */

// GET /todos
export const fetchAllTodos = createAsyncThunk(
  "Todo/fetchAllTodos",
  async (fetchTodo, _) => {
    const { token } = fetchTodo;
    const response = await fetch(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "There was an error fetching your groups. Please reload."
      );
    }

    const data = await response.json();
    return data;
  }
);

// POST /todos
export const postTodo = createAsyncThunk(
  "Todo/createTodo",
  async (todoData, _) => {
    const { token, content } = todoData;

    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 422 || !response.ok) {
      throw new Error(
        data.message || "There was an error creating the group. Please reload."
      );
    }

    return data;
  }
);

// PUT /todos/:id
export const updateCurrTodo = createAsyncThunk(
  "Todo/updateTodo",
  async (todoUpdate, _) => {
    const { token, id, content } = todoUpdate;

    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(content),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "There was an error updating the group's title. Please reload."
      );
    }
    const data = await response.json();
    return data;
  }
);

// DELETE /todos/:id
export const deleteCurrTodo = createAsyncThunk(
  "Todo/deleteTodo",
  async (todoDetail, _) => {
    const { token, id } = todoDetail;

    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("There was an error deleting the group.");
    }
    const data = await response.json();

    return data;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    Todo: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.fulfilled, (state, { payload }) => {
        const { todos } = payload;
        state.Todo = todos;
      })
      .addCase(postTodo.fulfilled, (state, { payload }) => {
        const { todo } = payload;
        state.Todo.push(todo);
      })
      .addCase(deleteCurrTodo.fulfilled, (state, { payload }) => {
        const { todo } = payload;
        state.Todo = state.Todo.filter((obj) => obj.id !== todo.id);
      })
      .addCase(updateCurrTodo.fulfilled, (state, { payload }) => {
        console.log(payload, "FROM SLICE");

        const { todo } = payload;
        const objIndex = state.Todo.findIndex((obj) => obj.id === todo.id);
        state.Todo[objIndex] = todo;
      });
  },
});

export const getAllTodo = (state) => state.todo.Todo;

export const todoAction = todoSlice.actions;
export default todoSlice;
