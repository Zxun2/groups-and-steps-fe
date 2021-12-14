import "./App.css";
import { Home } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { Route, Switch } from "react-router-dom";

function App() {
  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     axios
  //       .get("http://localhost:3001/logged_in", {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         if (response.data.logged_in && loggedInStatus === "NOT_LOGGED_IN") {
  //           setLoginStatus({
  //             loggedInStatus: "LOGGED_IN",
  //             user: response.data.user,
  //           });
  //         } else if (
  //           !response.data.logged_in &&
  //           loggedInStatus === "LOGGED_IN"
  //         ) {
  //           setLoginStatus({
  //             loggedInStatus: "NOT_LOGGED_IN",
  //             user: {},
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Check login error", err);
  //       });
  //   };
  //   checkLoginStatus();
  // }, [loggedInStatus]);

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
