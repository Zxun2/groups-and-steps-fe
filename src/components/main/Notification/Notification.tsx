import { uiAction, getAllNotifications } from "../../../store/ui-slice";
import React, { useState, useCallback } from "react";
import { NotificationType, NotificationStatus } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/useHooks";

// Logic for app-wide notifications
type NotificationProps = {
  status: NotificationStatus;
  title: string;
  message: string;
  id?: string;
};

const Notification: React.FC<NotificationProps> = (props) => {
  const [exit, setExit] = useState(false);
  const notifications = useAppSelector(getAllNotifications);
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer | null>(null);

  // Limit number of notifications on screen
  if (notifications.length > 3) {
    dispatch(uiAction.removeNotification({}));
  }

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          // continue from prev width
          return prev + 0.5;
        }
        // finished
        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  // clear timer
  const handlePauseTimer = useCallback(() => {
    clearInterval(intervalID as NodeJS.Timer);
  }, [intervalID]);

  const handleCloseNotification = useCallback(() => {
    // remove timer
    handlePauseTimer();
    setExit(true);
    dispatch(uiAction.removeNotification({}));
  }, [dispatch, handlePauseTimer]);

  React.useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification();
    }
  }, [width, handleCloseNotification]);

  // Start timer automatically
  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${
        props.status === NotificationType.SUCCESS
          ? "success"
          : props.status === NotificationType.FAIL
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
