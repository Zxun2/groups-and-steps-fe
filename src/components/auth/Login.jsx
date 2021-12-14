import { useState } from "react";
import classes from "./Login.module.css";
import { API_URL } from "../../actions/apiUrl";
import { useDispatch } from "react-redux";
import { userAction } from "../store/user-slice";
import { useSelector } from "react-redux";

const initialState = {
  email: "",
  password: "",
  registrationErrors: "",
};

const Login = (props) => {
  const loginState = useSelector((state) => state.user.status);
  const [formState, setFormState] = useState(initialState);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const { email, password } = formState;

    e.preventDefault();
    // url, data, method

    const Login = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error("Something Went Wrong!");
        }

        const data = await response.json();
        const token = data.data.auth_token;
        const user = data.data.user;
        localStorage.setItem("token", token);
        dispatch(
          userAction.logUserIn({
            payload: {
              user,
              token,
            },
          })
        );

        props.handleSuccessfulAuth();
      } catch (err) {
        console.log(err.message);
      }
    };

    Login();

    formState.email = "";
    formState.password = "";
  };

  const valueChangeHandler = (e) => {
    setFormState((prevState) => {
      const value = e.target.value;
      return {
        ...prevState,
        [e.target.name]: value,
      };
    });
  };

  return (
    <div className={classes.login}>
      <form onSubmit={handleSubmit} className={classes.login__form}>
        <h1> Login Here 🚨</h1>
        <h2> {loginState}</h2>
        <input
          type="email"
          name="email"
          placeholder="Type your email"
          value={formState.email}
          onChange={valueChangeHandler}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Type your password"
          value={formState.password}
          onChange={valueChangeHandler}
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
