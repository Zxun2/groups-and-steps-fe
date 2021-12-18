import { createSlice } from "@reduxjs/toolkit";
import { COMPLETED, FAIL, LOADING, SUCCESS } from "../../actions/constants";
import { addStep, deleteStep, fetchSteps, updateStep } from "../lib/api";
import { uiAction } from "./ui-slice";

const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    steps: [],
    changed: false,
  },
  reducers: {
    replaceSteps(state, action) {
      state.steps = action.payload.steps;
    },
    addNewStep(state, action) {
      const newsteps = action.payload;
      state.changed = true;
      state.steps.push({
        id: newsteps.id,
        title: newsteps.title,
      });
    },
    removeStep(state, action) {
      state.changed = true;
      const { id } = { ...action.payload };
      state.steps = state.steps.filter((obj) => obj.id !== id);
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
    },
  },
});

// TODO: REFACTOR CODE
// Action creators
export const fetchstepsData = (id) => {
  return async (dispatch) => {
    dispatch(
      uiAction.updateGlobalState({
        status: LOADING,
      })
    );

    const token = localStorage.getItem("token");

    try {
      const stepsData = await fetchSteps(id, token);

      dispatch(
        stepsAction.replaceSteps({
          steps: stepsData || [],
        })
      );

      dispatch(
        uiAction.showNotification({
          status: SUCCESS,
          title: "Success!",
          message: "Steps is fetched successfully!",
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

export const addStepData = (stepsData, todo_id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    dispatch(
      uiAction.updateGlobalState({
        status: LOADING,
      })
    );

    try {
      await addStep(stepsData, token, todo_id);

      // dispatch(
      //   stepsAction.replaceSteps({
      //     steps: newstepsData || [],
      //   })
      // );

      dispatch(
        uiAction.showNotification({
          status: SUCCESS,
          title: "Success!",
          message: "Step added successfully!",
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

export const updateStepData = (todo_id, step_id, content) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    dispatch(
      uiAction.updateGlobalState({
        status: LOADING,
      })
    );

    try {
      await updateStep(todo_id, step_id, token, content);

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Step updated successfully!",
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
      await deleteStep(todo_id, step_id, token);

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Deleted step successfully!",
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
