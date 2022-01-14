import { useCallback } from "react";
import { uiAction } from "../store/ui-slice";
import { ACTION } from "../misc/constants";

import { useAppDispatch } from "./useHooks";

// Custom Hook for Sending HTTP requests

export function useHttp2(requestFunction: any) {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

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
          throw new Error(response.error.message);
        }

        dispatch(
          uiAction.showNotification({
            status: ACTION.SUCCESS,
            _title: "Success!",
            message: response.payload.message || "The request is successful.",
          })
        );
      } catch (error: any) {
        dispatch(
          uiAction.showNotification({
            status: ACTION.FAIL,
            _title: "Error!",
            message:
              error.message ||
              "There was an error sending the request. Please reload.",
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
