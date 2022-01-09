// Fetch data
export const SUCCESS = "is-success";
export const FAIL = "is-error";
export const LOADING = "is-loading";
export const COMPLETED = "is-completed";
export const NOTICE = "notice";

export enum ACTION {
  SUCCESS = "is-success",
  FAIL = "is-error",
  LOADING = "is-loading",
  COMPLETED = "is-completed",
  NOTICE = "notice",
}

export type NotificationStatus = ACTION.SUCCESS | ACTION.FAIL | ACTION.NOTICE;

export enum STATUS {
  USER_LOGGED_IN = "is-logged-in",
  USER_LOGGED_OUT = "is-logged-out",
}

// Dashboard
export const drawerWidth = 250;
