import axios from "axios";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
  password_confirmation: "",
  registrationErrors: "",
};

const Registration = (props) => {
  const [formState, setFormState] = useState(initialState);

  const handleSubmit = (e) => {
    const { email, password, password_confirmation } = formState;

    e.preventDefault();
    // url, data, method
    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            email,
            password,
            password_confirmation,
          },
        },
        {
          withCredentials: true, // important!
        }
      )
      .then((response) => {
        console.log("registration successful", response);
        if (response.data.status === "created") {
          props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    formState.email = "";
    formState.password = "";
    formState.password_confirmation = "";
  };

  // TODO: PLEASE REFACTOR THIS!
  const emailChangeHandler = (e) => {
    setFormState((prevState) => {
      const value = e.target.value;
      return {
        ...prevState,
        email: value,
      };
    });
  };

  const passwordChangeHandler = (e) => {
    setFormState((prevState) => {
      const value = e.target.value;
      return {
        ...prevState,
        password: value,
      };
    });
  };

  const passwordConfirmationChangeHandler = (e) => {
    setFormState((prevState) => {
      const value = e.target.value;
      return {
        ...prevState,
        password_confirmation: value,
      };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Type your email"
          value={formState.email}
          onChange={emailChangeHandler}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Type your password"
          value={formState.password}
          onChange={passwordChangeHandler}
          required
        ></input>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          value={formState.password_confirmation}
          onChange={passwordConfirmationChangeHandler}
          required
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
