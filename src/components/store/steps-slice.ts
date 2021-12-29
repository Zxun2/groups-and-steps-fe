import { createSlice } from "@reduxjs/toolkit";
// import { COMPLETED, FAIL, LOADING, SUCCESS } from "../../misc/constants";
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
 * interface Step {
 *  completed: boolean;
 *  created_at: Date;
 *  id: number;
 *  step: string;
 *  tags: string[];
 *  todo_id: number;
 *  updated_at: Date;
 * }
 */

const stepSlice = createSlice({
  // A name used in action types
  name: "steps",
  // The initial state
  initialState: {
    steps: [],
    temp: [],
    changed: false,
  },
  // An object of "case reducers". Key names will be used to generate actions.
  reducers: {
    replaceSteps(state, action) {
      state.steps = action.payload.steps;
      state.temp = state.steps;
    },
    addNewStep(state, action) {
      const newstep = action.payload;
      state.changed = true;
      state.steps.push({
        id: newstep.id,
        title: newstep.title,
      });
      state.temp = state.steps;
    },
    removeStep(state, action) {
      state.changed = true;
      const { id } = { ...action.payload };
      state.steps = state.steps.filter((obj) => obj.id !== id);
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

// export const StepCreators = (request, ...args) => {
//   return async (dispatch) => {
//     dispatch(
//       uiAction.updateGlobalState({
//         status: LOADING,
//       })
//     );

//     const token = localStorage.getItem("token");

//     try {
//       const stepsData = await request(token, ...args);

//       if (stepsData.status === 422) {
//         throw new Error(stepsData.message);
//       }

//       if (stepsData?.steps) {
//         dispatch(
//           stepAction.replaceSteps({
//             steps: stepsData.steps || [],
//           })
//         );
//       }

//       dispatch(
//         uiAction.showNotification({
//           status: SUCCESS,
//           title: "Success!",
//           message: stepsData.message,
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiAction.showNotification({
//           status: FAIL,
//           title: "Error!",
//           message: err.message || "Something went wrong!",
//         })
//       );
//     }

//     dispatch(
//       uiAction.updateGlobalState({
//         status: COMPLETED,
//       })
//     );
//   };
// };

export const stepAction = stepSlice.actions;
export default stepSlice;
