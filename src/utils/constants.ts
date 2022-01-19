// Fetch data
export enum NotificationType {
  SUCCESS = "is-success",
  FAIL = "is-error",
  LOADING = "is-loading",
  COMPLETED = "is-completed",
  NOTICE = "notice",
}

export type NotificationStatus =
  | NotificationType.SUCCESS
  | NotificationType.FAIL
  | NotificationType.NOTICE;

// User status
export enum UserStatus {
  USER_LOGGED_IN = "is-logged-in",
  USER_LOGGED_OUT = "is-logged-out",
}

// Dashboard
export const drawerWidth = 250;

// Base Url
export const API_URL = "https://cvwo-assignment-todo-api.herokuapp.com";
