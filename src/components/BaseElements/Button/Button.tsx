import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{ label: string; action?: () => void }> = (props) => {
  return (
    <button className={classes.button} onClick={props.action}>
      {props.label}
    </button>
  );
};

export default Button;
