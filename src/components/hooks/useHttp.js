import { useReducer, useCallback } from "react";
import { uiAction } from "../store/ui-slice";
import { COMPLETED, LOADING } from "../../actions/constants";

function httpReducer(state, action) {
  switch (action.type) {
    case "SEND":
      return {
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        data: action.responseData,
        error: null,
      };
    case "ERROR":
      return {
        data: null,
        error: action.errorMessage,
      };
    default:
      return state;
  }
}

// Custom Hook for Sending HTTP requests
function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
  });

  startWithPending &&
    dispatch(
      uiAction.updateGlobalState({
        status: LOADING,
      })
    );

  const sendRequest = useCallback(
    async function (...requestData) {
      dispatch({ type: "SEND" });
      try {
        const response = await requestFunction(...requestData);
        const data = await response.json();

        if (response.status === 422 || !response.ok) {
          if (data) {
            throw new Error(data.message);
          }
        }
        dispatch({ type: "SUCCESS", response });
      } catch (error) {
        dispatch({
          type: "ERROR",
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );

  dispatch(
    uiAction.updateGlobalState({
      status: COMPLETED,
    })
  );
  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
