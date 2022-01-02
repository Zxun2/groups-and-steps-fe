import "./App.css";
import { Home } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { Route, Switch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoLogin } from "./store/user-slice";
import { useHistory } from "react-router-dom";
import Notification from "./components/ui/Notification";
import { uiAction } from "./store/ui-slice";
import { NOTICE } from "./misc/constants";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const notifications = useSelector((state) => state.ui.notification);

  // Auto Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(autoLogin(token));
        history.push("/dashboard");
      } catch (err) {
        dispatch(
          uiAction.showNotification({
            status: "error",
            title: "Error!",
            message: err.message,
          })
        );
      }
    } else {
      history.push("/");
      dispatch(
        uiAction.showNotification({
          status: NOTICE,
          title: "Take Note!",
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
