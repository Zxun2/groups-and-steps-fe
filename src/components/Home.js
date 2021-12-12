import React from "react";
import { useHistory } from "react-router-dom";
import Registration from "./auth/registration";

export const Home = (props) => {
  const history = useHistory();
  const handleSuccessfulAuth = (data) => {
    history.push("/dashboard"); // SUCCESSFULLY REGISTERED and REDIRECTS USER TO DASHBOARD
    props.handleLogin(data);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <h2>Status: {props.loggedInStatus}</h2>
      <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};
