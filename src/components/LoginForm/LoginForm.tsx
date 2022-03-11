import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { authActions } from "../../store/authSlice";
import Button from "../BaseElements/Button/Button";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [emailInputTouched, setEmailInputTouched] = useState(false);
  const [passInputTouched, setPassInputTouched] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const submitLoginForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("submit login...");
    if (!isValidEmail || !isValidPass) {
      return;
    }
    dispatch(authActions.login({ email, password }));
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    setEmail(enteredValue);
    if (enteredValue.trim() === "" || !enteredValue.includes("@")) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value;
    setPassword(enteredValue);
    if (enteredValue.trim() === "") {
      setIsValidPass(false);
    } else {
      setIsValidPass(true);
    }
  };

  const emailBlurHandler = () => {
    setEmailInputTouched(true);
  };
  const passBlurHandler = () => {
    setPassInputTouched(true);
  };
  return (
    <form className={classes.form} onSubmit={submitLoginForm}>
      <div
        className={`${classes.title} ${
          !isValidEmail && emailInputTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="emain">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          placeholder="Enter your email"
          onChange={onChangeEmail}
          onBlur={emailBlurHandler}
        />
      </div>
      <div
        className={`${classes.title} ${
          !isValidPass && passInputTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="emain">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          onChange={onChangePassword}
          onBlur={passBlurHandler}
        />
      </div>
      <div className={classes.action}>
        <Button label={"LOGIN"} />
      </div>
    </form>
  );
};

export default LoginForm;
