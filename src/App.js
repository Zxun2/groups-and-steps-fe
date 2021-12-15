import "./App.css";
import { Home } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "./components/store/user-slice";
import { useHistory } from "react-router-dom";
import Notification from "./components/ui/Notification";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const notification = useSelector((state) => state.ui.notification);
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
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
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
