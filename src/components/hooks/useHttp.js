import { useCallback, useEffect } from "react";
import { uiAction } from "../store/ui-slice";
import { COMPLETED, LOADING, SUCCESS } from "../../actions/constants";

import { useDispatch } from "react-redux";
import { stepsAction } from "../store/steps-slice";
import { todoAction } from "../store/todo-slice";

// Custom Hook for Sending HTTP requests
function useHttp(requestFunction, startWithPending = false) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    startWithPending &&
      dispatch(
        uiAction.updateGlobalState({
          status: LOADING,
        })
      );
  }, [dispatch, startWithPending]);

  const sendRequest = useCallback(
    async function (...requestData) {
      try {
        const response = await requestFunction(token, ...requestData);

        if (response.status === 422) {
          if (response) {
            throw new Error(response.message);
          }
        }
        if (response?.steps) {
          dispatch(
            stepsAction.replaceSteps({
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
      } catch (error) {}
    },
    [requestFunction, dispatch, token]
  );

  dispatch(
    uiAction.updateGlobalState({
      status: COMPLETED,
    })
  );
  return {
    sendRequest,
  };
}

export default useHttp;
