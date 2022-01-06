import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../misc/base-url";
import randomColor from "randomcolor";
import request from "../api";

// GET /todos/:id/items
export const fetchAllStep = createAsyncThunk(
  "steps/fetchAllStep",
  async (fetchStep, _) => {
    const { token, id: todo_id } = fetchStep;

    return request(
      "GET",
      { headers: { Authorization: `Bearer ${token}` } },
      "There was an error fetching the steps",
      `${API_URL}/todos/${todo_id}/items`
    );
  }
);

// PUT /todos/:id/items/:item_id
export const updateCurrStep = createAsyncThunk(
  "steps/updateStep",
  async (newStepData, _) => {
    const { token, todo_id, step_id, content } = newStepData;

    return request(
      "PUT",
      { headers: { Authorization: `Bearer ${token}` }, content },
      "There was an error updating the step.",
      `${API_URL}/todos/${todo_id}/items/${step_id}`
    );
  }
);

// POST /todos/:id/items
export const createNewStep = createAsyncThunk(
  "steps/createStep",
  async (newStepData, _) => {
    const { token, content, todo_id } = newStepData;
    const newStep = { ...content, completed: false };

    return request(
      "POST",
      { headers: { Authorization: `Bearer ${token}` }, content: newStep },
      "There was an error creating the step.",
      `${API_URL}/todos/${todo_id}/items`
    );
  }
);

// DELETE /todos/:id/items/:item_id
export const deleteCurrStep = createAsyncThunk(
  "steps/deleteStep",
  async (currStepData, _) => {
    const { token, todo_id, step_id } = currStepData;

    return request(
      "DELETE",
      { headers: { Authorization: `Bearer ${token}` } },
      "There was an error deleting the step.",
      `${API_URL}/todos/${todo_id}/items/${step_id}`
    );
  }
);

const stepState = {
  steps: [],
  // temp array to account for filtering and ordering of steps
  temp: [],
  completedCount: 0,
  unCompletedCount: 0,
};

const stepSlice = createSlice({
  name: "steps",
  initialState: stepState,
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
    resetStepState(state, _) {
      state.steps = [];
      state.temp = [];
      state.completedCount = 0;
      state.unCompletedCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCurrStep.fulfilled, (state, { payload }) => {
        const { item: step } = payload;

        const objIndex = state.steps.findIndex((obj) => obj.id === step.id);
        const tempIndex = state.temp.findIndex((obj) => obj.id === step.id);

        state.steps[objIndex] = step;

        if (tempIndex !== -1) {
          state.temp[tempIndex] = step;
        }

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
        state.temp = [...state.steps];
      })
      .addCase(createNewStep.fulfilled, (state, { payload }) => {
        const { step } = payload;
        state.steps.push(step);
        state.temp.push(step);

        state.unCompletedCount += 1;
      })
      .addCase(fetchAllStep.fulfilled, (state, { payload }) => {
        state.steps = payload.steps;
        state.temp = [...state.steps];

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
export const getCompletedAndUncompletedSteps = (state) => {
  const steps = getAllSteps(state);
  const completed = [];
  const uncompleted = [];

  steps.map((step) => {
    if (step.completed) {
      return completed.push(step);
    } else {
      return uncompleted.push(step);
    }
  });

  return { completed, uncompleted };
};

export const getFilterLabels = (state) => {
  const steps = getAllSteps(state);
  return steps.map((step, _) => {
    const color = randomColor();
    const tags = step.tags; // array
    return {
      tags: [...tags],
      step: step.step,
      color,
      id: step.id,
    };
  });
};

export const stepAction = stepSlice.actions;
export default stepSlice;

/*
interface Step {
 completed: boolean;
 created_at: Date;
 id: number;
 step: string;
 tags: string[];
 todo_id: number;
 updated_at: Date;
}
*/
