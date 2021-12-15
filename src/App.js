import "./App.css";
import { Home } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAction } from "./components/store/user-slice";
import { uiAction } from "./components/store/ui-slice";
import { useHistory } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  // Auto Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    const autoLogin = async () => {
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:3001/auth/auto_login",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();

          dispatch(
            userAction.logUserIn({
              user: data,
              token,
            })
          );

          history.push("/dashboard");
        } catch (err) {
          console.log(err);
        }
      }
    };

    autoLogin();
  }, [dispatch, history]);

  return (
    <div>
      <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>
        <Route exact path={"/dashboard"}>
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
