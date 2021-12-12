import React from "react";

export const Dashboard = (props) => {
  return (
    <div>
      <h1>Hello Dashboard</h1>
      <h1>Status: {props.loggedInStatus}</h1>
    </div>
  );
};
