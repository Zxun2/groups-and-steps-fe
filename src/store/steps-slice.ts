import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";
import randomColor from "randomcolor";
import request from "../api";
import { RootState } from ".";
import { Step } from "../types/index";
import { LabelType, APIStepRequestType } from "../types";

interface StepState {
  steps: Step[];
  temp: Step[];
  completedCount: number;
  unCompletedCount: number;
}

// GET /todos/:id/items
export const fetchAllStep = createAsyncThunk(
  "steps/fetchAllStep",
  async (body: APIStepRequestType, _) => {
    const { token, todo_id } = body;

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
  async (body: APIStepRequestType, _) => {
    const { token, todo_id, step_id, content } = body;

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
  async (body: APIStepRequestType, _) => {
    const { token, content, todo_id } = body;
    const data = { ...content, completed: false };

    return request(
      "POST",
      { headers: { Authorization: `Bearer ${token}` }, content: data },
      "There was an error creating the step.",
      `${API_URL}/todos/${todo_id}/items`
    );
  }
);

// DELETE /todos/:id/items/:item_id
export const deleteCurrStep = createAsyncThunk(
  "steps/deleteStep",
  async (body: APIStepRequestType, _) => {
    const { token, todo_id, step_id } = body;

    return request(
      "DELETE",
      { headers: { Authorization: `Bearer ${token}` } },
      "There was an error deleting the step.",
      `${API_URL}/todos/${todo_id}/items/${step_id}`
    );
  }
);

const initialState: StepState = {
  steps: [],
  temp: [],
  completedCount: 0,
  unCompletedCount: 0,
};

const stepSlice = createSlice({
  name: "steps",
  initialState: initialState,
  reducers: {
    filterStep(state, action) {
      const filter = action.payload.filterArr;
      state.temp = [];
      if (filter.length > 0) {
        for (const obj of filter) {
          const step = state.steps.find((elem) => elem.id === obj) as Step;
          state.temp.push(step);
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

        payload.steps.map((step: Step) => {
          if (step.completed) {
            return (state.completedCount += 1);
          } else {
            return (state.unCompletedCount += 1);
          }
        });
      });
  },
});

export const getAllSteps = (state: RootState) => state.step.temp;
export const getCompletedCount = (state: RootState) =>
  state.step.completedCount;
export const getUncompletedCount = (state: RootState) =>
  state.step.unCompletedCount;
export const getCompletedAndUncompletedSteps = (state: RootState) => {
  const steps = getAllSteps(state);
  const completed: Step[] = [];
  const uncompleted: Step[] = [];

  steps.map((step: Step) => {
    if (step.completed) {
      return completed.push(step);
    } else {
      return uncompleted.push(step);
    }
  });

  return { completed, uncompleted };
};

export const getFilterLabels = (state: RootState): LabelType[] => {
  const steps = state.step.steps;
  return steps.map((step: Step, _) => {
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
