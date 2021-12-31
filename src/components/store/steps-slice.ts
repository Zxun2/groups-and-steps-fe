import { createSlice } from "@reduxjs/toolkit";

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

interface Step {
  completed: boolean;
  created_at: Date;
  id: number;
  step: string;
  tags: string[];
  todo_id: number;
  updated_at: Date;
}

interface stepState {
  steps: Step[];
  temp: Step[];
  changed: boolean;
}

const stepSlice = createSlice({
  name: "steps",
  initialState: {
    steps: [],
    temp: [],
    changed: false,
  } as stepState,
  reducers: {
    replaceSteps(state, action) {
      state.steps = action.payload.steps;
      state.temp = state.steps;
    },
    removeStep(state, action) {
      state.changed = true;
      state.steps = state.steps.filter((obj) => obj.id !== action.payload.id);
      state.temp = state.steps;
    },
    updateStep(state, action) {
      state.changed = true;

      const objIndex = state.steps.findIndex(
        (obj) => obj.id === action.payload.id
      );

      state.steps[objIndex] = {
        ...state.steps[objIndex],
        ...action.payload.data,
      };
      state.temp = state.steps;
    },
    filterStep(state, action) {
      state.changed = true;
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
});

export const stepAction = stepSlice.actions;
export default stepSlice;
