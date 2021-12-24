import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  registrationErrors: "",
};

const Registration = (props) => {
  const [formState, setFormState] = useState(initialState);

  const handleSubmit = (e) => {
    const { name, email, password, password_confirmation } = formState;

    const body = JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
    });

    console.log(body);

    e.preventDefault();
    // url, data, method
    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
      body,
    })
      .then((response) => {
        console.log("Login successful", response.data);
        // if (response.data.logged_in) {
        //   props.handleSuccessfulAuth(response.data);
        // }
      })
      .catch((err) => {
        console.log(err.message);
      });

    formState.email = "";
    formState.password = "";
    formState.password_confirmation = "";
  };

  // TODO: PLEASE REFACTOR THIS!
  const nameChangeHandler = (e) => {
    setFormState((prevState) => {
      const value = e.target.value;
      return {
        ...prevState,
        name: value,
      };
    });
  };

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
          type="name"
          name="name"
          placeholder="Type your name"
          value={formState.name}
          onChange={nameChangeHandler}
          required
        ></input>
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
