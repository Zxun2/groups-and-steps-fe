import "./App.css";
import { Home } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "./components/store/user-slice";
import { useHistory } from "react-router-dom";
import Notification from "./components/ui/Notification";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const notifications = useSelector((state) => state.ui.notification);

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

  console.log(notifications);
  return (
    <Fragment>
      <div className={"notification-wrapper"}>
        {notifications.map((note) => {
          return (
            <Notification
              key={note.id}
              status={note.status}
              title={note.title}
              message={note.message}
              id={note.id}
            />
          );
        })}
      </div>
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
    </Fragment>
  );
}

export default App;
