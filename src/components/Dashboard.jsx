import React from "react";
import { useSelector } from "react-redux";

export const Dashboard = (props) => {
  const state = useSelector((state) => state.user);
  return (
    <div>
      <h1>
        Welcome
        <span style={{ color: "#8d0ada" }}> {state.currUser.name}</span>
      </h1>
      <h1>Status: {state.status}</h1>
    </div>
  );
};
