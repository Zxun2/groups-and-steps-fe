import { uiAction } from "../store/ui-slice";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FAIL, SUCCESS } from "../../actions/constants";

const Notification = (props) => {
  const [exit, setExit] = useState(false);
  const notifications = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  if (notifications.length > 3) {
    setTimeout(() => {
      dispatch(uiAction.removeNotification());
    }, 0);
  }

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          // continue from prev width
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = useCallback(() => {
    // clear timer
    clearInterval(intervalID);
  }, [intervalID]);

  const handleCloseNotification = useCallback(() => {
    // remove timer
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch(uiAction.removeNotification());
    });
  }, [dispatch, handlePauseTimer]);

  React.useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification();
    }
  }, [width, handleCloseNotification]);

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        props.status === SUCCESS
          ? "success"
          : props.status === FAIL
          ? "error"
          : "notice"
      } ${exit ? "exit" : ""}`}
    >
      <strong>{props.title}</strong>
      <p>{props.message}</p>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
