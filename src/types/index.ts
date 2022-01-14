import { NotificationStatus } from "../misc/constants";
export interface Step {
  completed: boolean;
  created_at: Date;
  id: number;
  step: string;
  tags: string[];
  todo_id: number;
  deadline: Date;
  updated_at: Date;
}

export interface Todo {
  created_at: Date;
  created_by: string;
  id: number;
  title: string;
  updated_at: Date;
}

export interface Notification {
  message: string;
  status: NotificationStatus;
  _title: string;
  id?: string;
}

export interface User {
  id: number;
  created_at: Date;
  updated_at: Date;
  email: string;
  name: string;
  password_digest: string;
}
