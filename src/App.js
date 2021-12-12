import "./App.css";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";

const loginState = {
  loggedInStatus: "NOT_LOGGED_IN",
  user: {},
};

function App() {
  const [loginStatus, setLoginStatus] = useState(loginState);
  const handlerLogin = (data) => {
    setLoginStatus({
      loggedInStatus: data.status,
      user: {
        ...data.user,
      },
    });
  };
  return (
    <div>
      <Switch>
        <Route exact path={"/"}>
          <Home
            handleLogin={handlerLogin}
            loggedInStatus={loginStatus.loggedInStatus}
          />
        </Route>
        <Route exact path={"/dashboard"}>
          <Dashboard loggedInStatus={loginStatus.loggedInStatus} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
