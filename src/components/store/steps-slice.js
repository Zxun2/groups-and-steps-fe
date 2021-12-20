import { createSlice } from "@reduxjs/toolkit";
import { COMPLETED, FAIL, LOADING, SUCCESS } from "../../actions/constants";
import { deleteStep, updateStep } from "../lib/api";
import { uiAction } from "./ui-slice";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    steps: [],
    temp: [],
    changed: false,
  },
  reducers: {
    replaceSteps(state, action) {
      state.steps = action.payload.steps;
      state.temp = state.steps;
    },
    addNewStep(state, action) {
      const newsteps = action.payload;
      state.changed = true;
      state.steps.push({
        id: newsteps.id,
        title: newsteps.title,
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

export const StepCreators = (request, ...args) => {
  return async (dispatch) => {
    dispatch(
      uiAction.updateGlobalState({
        status: LOADING,
      })
    );

    const token = localStorage.getItem("token");

    try {
      const stepsData = await request(token, ...args);

      if (stepsData.status === 422) {
        throw new Error(stepsData.message);
      }

      if (stepsData?.steps) {
        dispatch(
          stepsAction.replaceSteps({
            steps: stepsData.steps || [],
          })
        );
      }

      dispatch(
        uiAction.showNotification({
          status: SUCCESS,
          title: "Success!",
          message: stepsData.message,
        })
      );
    } catch (err) {
      dispatch(
        uiAction.showNotification({
          status: FAIL,
          title: "Error!",
          message: err.message,
        })
      );
    }

    dispatch(
      uiAction.updateGlobalState({
        status: COMPLETED,
      })
    );
  };
};

export const deleteStepData = (todo_id, step_id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    try {
      const stepsData = await deleteStep(token, todo_id, step_id);

      if (stepsData.status === 422) {
        throw new Error(stepsData.message);
      }

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: stepsData.message,
        })
      );
    } catch (err) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: err.message,
        })
      );
    }
  };
};

export const stepsAction = stepsSlice.actions;
export default stepsSlice;
