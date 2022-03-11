import { useContext } from "react";
import { TaskContext } from "../../task-context";
import classes from "./ToggleTheme.module.css";

const ToggleTheme = () => {
  const taskCtx = useContext(TaskContext);
  const toggleThemeHandler = () => {
    taskCtx.changeTheme();
  };
  return (
    <div className={classes["toggle-wrapper"]}>
      <span>Dark</span>
      <label className={classes.switch}>
        <input
          type="checkbox"
          defaultChecked={taskCtx.isLightTheme}
          onChange={toggleThemeHandler}
        />
        <div className={`${classes.slider} ${classes.round}`}></div>
      </label>
      <span>Light</span>
    </div>
  );
};

export default ToggleTheme;
