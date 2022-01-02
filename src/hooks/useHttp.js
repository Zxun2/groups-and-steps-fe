import { useCallback } from "react";
import { uiAction } from "../store/ui-slice";
import { FAIL, SUCCESS } from "../misc/constants";

import { useDispatch } from "react-redux";

// Custom Hook for Sending HTTP requests

export function useHttp2(requestFunction) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const sendRequest = useCallback(
    async function ({ ...requestData }) {
      try {
        // Set loading state to true
        dispatch(
          uiAction.updateGlobalState({
            status: true,
          })
        );

        // Request
        const response = await dispatch(
          requestFunction({ token, ...requestData })
        );

        if (response.error) {
          throw new Error(response.payload.message);
        }

        dispatch(
          uiAction.showNotification({
            status: SUCCESS,
            title: "Success!",
            message: response.payload.message || "The request is successful.",
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
