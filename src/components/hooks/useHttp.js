import { useCallback } from "react";
import { uiAction } from "../store/ui-slice";
import { FAIL, SUCCESS } from "../../misc/constants";

import { useDispatch } from "react-redux";
import { stepAction } from "../store/steps-slice";
import { todoAction } from "../store/todo-slice";

// Custom Hook for Sending HTTP requests
function useHttp(requestFunction, startWithPending = false) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async function (...requestData) {
      try {
        // Set loading state to true
        dispatch(
          uiAction.updateGlobalState({
            status: true,
          })
        );

        // Request
        const response = await requestFunction(token, ...requestData);

        if (response.status === 422) {
          if (response) {
            throw new Error(response.message);
          }
        }

        if (response?.steps) {
          dispatch(
            stepAction.replaceSteps({
              steps: response.steps || [],
            })
          );
        }

        if (response?.todos) {
          dispatch(
            todoAction.replaceTodo({
              Todo: response.todos || [],
            })
          );
        }

        dispatch(
          uiAction.showNotification({
            status: SUCCESS,
            title: "Success!",
            message: response.message,
          })
        );
      } catch (error) {
        dispatch(
          uiAction.showNotification({
            status: FAIL,
            title: "Error!",
            message:
              error.message ||
              "There was an error sending a request. Please reload.",
          })
        );
      }

      // Reset loading state
      dispatch(
        uiAction.updateGlobalState({
          status: false,
        })
      );
    },
    [requestFunction, dispatch, token]
  );

  return {
    sendRequest,
  };
}

export default useHttp;
