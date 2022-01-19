import { useCallback } from "react";
import { uiAction } from "../store/ui-slice";
import { NotificationType } from "../utils/constants";

import { useAppDispatch } from "./useHooks";

// Custom Hook for Sending HTTP requests
export function useHttp2(requestFunction: any) {
  const dispatch = useAppDispatch();

  const sendRequest = useCallback(
    async function ({ ...requestData }) {
      const token = localStorage.getItem("token");
      const { showNotification, updateGlobalState } = uiAction;

      try {
        // Set loading state to true
        dispatch(
          updateGlobalState({
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
          showNotification({
            status: NotificationType.SUCCESS,
            _title: "Success!",
            message: response.payload.message || "The request is successful.",
          })
        );
      } catch (error: any) {
        dispatch(
          showNotification({
            status: NotificationType.FAIL,
            _title: "Error!",
            message:
              error.message ||
              "There was an error sending the request. Please reload.",
          })
        );
      }

      // Reset loading state
      dispatch(
        updateGlobalState({
          status: false,
        })
      );
    },
    [requestFunction, dispatch]
  );

  return {
    sendRequest,
  };
}
