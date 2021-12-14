import React from "react";
import { useSelector } from "react-redux";

export const Dashboard = (props) => {
  const loginState = useSelector((state) => state.user.status);
  return (
    <div>
      <h1>Hello Dashboard</h1>
      <h1>Status: {loginState}</h1>
    </div>
  );
};
