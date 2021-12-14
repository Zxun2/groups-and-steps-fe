import React from "react";
import { useHistory } from "react-router-dom";
import Login from "./auth/Login";

export const Home = (props) => {
  const history = useHistory();

  const handleSuccessfulAuth = (data) => {
    history.push("/dashboard"); // SUCCESSFULLY REGISTERED and REDIRECTS USER TO DASHBOARD
  };

  return (
    <div>
      {/* <Registration handleSuccessfulAuth={handleSuccessfulAuth} /> */}
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
    </div>
  );
};
