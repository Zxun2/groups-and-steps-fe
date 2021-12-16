import { uiAction } from "../store/ui-slice";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

const Notification = (props) => {
  const [exit, setExit] = useState(false);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = useCallback(() => {
    clearInterval(intervalID);
  }, [intervalID]);

  const handleCloseNotification = useCallback(() => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      dispatch(uiAction.removeNotification(props.id));
    });
  }, [dispatch, handlePauseTimer, props.id]);

  React.useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification(props.id);
    }
  }, [width, handleCloseNotification, props.id]);

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        props.status === "success" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      <strong>{props.title}</strong>
      <p>{props.message}. Hover over me to see what happens!</p>
      <div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  );
};

export default Notification;
