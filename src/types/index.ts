import { NotificationStatus } from "../utils/constants";
export interface Step {
  id: number;
  step: string;
  deadline: Date;
  tags: string[];
  todo_id: number;
  created_at: Date;
  updated_at: Date;
  completed: boolean;
}
export interface Todo {
  id: number;
  title: string;
  updated_at: Date;
  created_at: Date;
  created_by: string;
}
export interface Notification {
  id?: string;
  _title: string;
  message: string;
  status: NotificationStatus;
}
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  password_digest: string;
}
export interface LabelType {
  id: number;
  step: string;
  color: string;
  tags: string[];
}

export type ContentType = {
  content?: Object;
  headers: {
    [key: string]: string;
  };
};

export type RequestsType = "POST" | "PUT" | "PATCH" | "DELETE" | "GET";
interface APIStepRequestContent {
  step?: string;
  deadline?: Date;
  tags?: string[];
  completed?: boolean;
}
export interface APIStepRequestType {
  token: string;
  todo_id: string;
  step_id?: string;
  content?: APIStepRequestContent;
}
export interface APITodoRequestType {
  id?: number;
  token: string;
  content?: { title: string };
}
export interface APIUserRequestType {
  name?: string;
  email: string;
  password: string;
  password_confirmation?: string;
}
export interface APIUserResponseType {
  user: User;
  token: string;
  message?: string;
}
export interface TodoOptionType {
  title: string;
  id?: number;
  inputValue?: string;
}
