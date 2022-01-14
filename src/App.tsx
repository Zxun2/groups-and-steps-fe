import "./App.css";
import { Home } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { autoLogin } from "./store/user-slice";
import { useHistory } from "react-router-dom";
import Notification from "./components/ui/Notification";
import { getAllNotifications, uiAction } from "./store/ui-slice";
import { ACTION } from "./misc/constants";
import { useAppDispatch, useAppSelector } from "./hooks/useHooks";

function App() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const notifications = useAppSelector(getAllNotifications);

  // Auto Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(autoLogin(token));
        history.push("/dashboard");
      } catch (err: any) {
        dispatch(
          uiAction.showNotification({
            status: ACTION.FAIL,
            _title: "Error!",
            message: err.message,
          })
        );
      }
    } else {
      history.push("/");
      dispatch(
        uiAction.showNotification({
          status: ACTION.NOTICE,
          _title: "Take Note!",
          message: "Your token has expired. Please sign in again!",
        })
      );
    }
  }, [dispatch, history]);

  return (
    <Fragment>
      <div className={"notification-wrapper"}>
        {notifications.map((note) => {
          return (
            <Notification
              key={note.id}
              status={note.status}
              title={note._title}
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
