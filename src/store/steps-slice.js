import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../misc/apiUrl";

// interface Step {
//  completed: boolean;
//  created_at: Date;
//  id: number;
//  step: string;
//  tags: string[];
//  todo_id: number;
//  updated_at: Date;
// }

// GET /todos/:id/items
export const fetchAllStep = createAsyncThunk(
  "steps/fetchAllStep",
  async (fetchStep, { rejectWithValue }) => {
    try {
      const { token, id } = fetchStep;

      const response = await fetch(`${API_URL}/todos/${id}/items`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("There was an error fetching the Steps.");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// PUT /todos/:id/items/:item_id
export const updateCurrStep = createAsyncThunk(
  "steps/updateStep",
  async (newStepData, { rejectWithValue }) => {
    try {
      const { token, todo_id, step_id, content } = newStepData;
      const response = await fetch(
        `${API_URL}/todos/${todo_id}/items/${step_id}`,
        {
          method: "PUT",
          body: JSON.stringify(content),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("There was an error updating the Step.");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// POST /todos/:id/items
export const createNewStep = createAsyncThunk(
  "steps/createStep",
  async (newStepData, { rejectWithValue }) => {
    try {
      const { token, content, todo_id } = newStepData;

      const newStep = { ...content, completed: false };

      const response = await fetch(`${API_URL}/todos/${todo_id}/items`, {
        method: "POST",
        body: JSON.stringify(newStep),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("There was an error creating the Step.");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// DELETE /todos/:id/items/:item_id
export const deleteCurrStep = createAsyncThunk(
  "steps/deleteStep",
  async (currStepData, { rejectWithValue }) => {
    try {
      const { token, todo_id, step_id } = currStepData;

      const response = await fetch(
        `${API_URL}/todos/${todo_id}/items/${step_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("There was an error deleting the Step.");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const stepSlice = createSlice({
  name: "steps",
  initialState: {
    steps: [],
    // temp array to account for filtering and ordering of steps
    temp: [],
    completedCount: 0,
    unCompletedCount: 0,
  },
  reducers: {
    filterStep(state, action) {
      const filter = action.payload.filterArr;
      state.temp = [];
      if (filter?.length > 0) {
        for (const obj of filter) {
          const step = state.steps.filter((step) => step.id === obj);

          state.temp = state.temp.concat(step);
        }
      } else {
        state.temp = state.steps;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCurrStep.fulfilled, (state, { payload }) => {
        const { item: step } = payload;

        const objIndex = state.steps.findIndex((obj) => obj.id === step.id);

        state.steps[objIndex] = step;
        state.temp = state.steps;

        step.completed
          ? (state.completedCount += 1)
          : (state.unCompletedCount += 1);

        step.completed
          ? (state.unCompletedCount -= 1)
          : (state.completedCount -= 1);
      })
      .addCase(deleteCurrStep.fulfilled, (state, { payload }) => {
        const { item } = payload;
        state.steps = state.steps.filter((obj) => obj.id !== item.id);
        state.temp = state.steps;
      })
      .addCase(createNewStep.fulfilled, (state, { payload }) => {
        const { step } = payload;
        state.steps.push(step);
        state.temp = state.steps;
      })
      .addCase(fetchAllStep.fulfilled, (state, { payload }) => {
        state.steps = payload.steps;
        state.temp = state.steps;
        state.completedCount = 0;
        state.unCompletedCount = 0;

        payload.steps.map((step) => {
          if (step.completed) {
            return (state.completedCount += 1);
          } else {
            return (state.unCompletedCount += 1);
          }
        });
      });
  },
});

export const getAllSteps = (state) => state.step.temp;
export const getCompletedCount = (state) => state.step.completedCount;
export const getUncompletedCount = (state) => state.step.unCompletedCount;

export const stepAction = stepSlice.actions;
export default stepSlice;
