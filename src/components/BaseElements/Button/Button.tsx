import React from "react";
import classes from "./Button.module.css";

const Button: React.FC<{ label: string; action?: () => void }> = (props) => {
  const { action, label, ...restProps } = props;
  return (
    <button className={classes.button} onClick={action} {...restProps}>
      {label}
    </button>
  );
};

export default Button;
