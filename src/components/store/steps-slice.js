import { createSlice } from "@reduxjs/toolkit";
import { fetchSteps } from "../lib/api";
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
    addNewsteps(state, action) {
      const newsteps = action.payload;
      state.changed = true;
      state.steps.push({
        id: newsteps.id,
        title: newsteps.title,
      });
    },
    removesteps(state, action) {
      state.changed = true;
      const id = action.payload;
      state.steps.filter((obj) => obj.id !== id);
    },
    updatesteps(state, action) {
      const objIndex = state.steps.findIndex(
        (obj) => obj.id === action.payload.id
      );
      state.steps[objIndex] = {
        ...state.steps[objIndex],
        title: action.payload.title,
      };
    },
  },
});

// Action creators
export const fetchstepsData = (id) => {
  return async (dispatch) => {
    dispatch(
      uiAction.updateGlobalState({
        status: "loading",
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
          status: "success",
          title: "Success!",
          message: "Steps is fetched successfully!",
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
        status: "completed",
      })
    );
  };
};

// export const addstepsData = (stepsData) => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");

//     try {
//       const newstepsData = await addsteps(stepsData, token);

//       dispatch(
//         stepsAction.replacesteps({
//           steps: newstepsData || [],
//         })
//       );

//       dispatch(
//         uiAction.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "Added steps successfully!",
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiAction.showNotification({
//           status: "error",
//           title: "Error!",
//           message: err.message,
//         })
//       );
//     }
//   };
// };

// export const updatestepsData = (id, content) => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");

//     try {
//       const newstepsData = await updatesteps(id, token, content);

//       dispatch(
//         stepsAction.replacesteps({
//           steps: newstepsData.sort((a, b) => a.id - b.id) || [],
//         })
//       );

//       dispatch(
//         uiAction.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "Updated steps successfully!",
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiAction.showNotification({
//           status: "error",
//           title: "Error!",
//           message: err.message,
//         })
//       );
//     }
//   };
// };

// export const deletestepsData = (id) => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");

//     try {
//       const newstepsData = await deletesteps(id, token);

//       dispatch(
//         stepsAction.replacesteps({
//           steps: newstepsData.sort((a, b) => a.id - b.id) || [],
//         })
//       );

//       dispatch(
//         uiAction.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "steps deleted successfully!",
//         })
//       );
//     } catch (err) {
//       dispatch(
//         uiAction.showNotification({
//           status: "error",
//           title: "Error!",
//           message: err.message,
//         })
//       );
//     }
//   };
// };

export const stepsAction = stepsSlice.actions;
export default stepsSlice;
