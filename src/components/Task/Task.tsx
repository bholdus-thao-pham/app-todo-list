import React, { Dispatch, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AnyAction } from "redux";
import Todo from "../../models/todo";
import { RootState } from "../../store";
import { taskAction } from "../../store/tasksSlice";
import { TaskContext } from "../../task-context";
import classes from "./Task.module.css";

const Task: React.FC<{ id: string }> = (props) => {
  const task = useSelector<RootState, Todo | undefined>((state) =>
    state.task.taskList.find((item) => item.id === props.id)
  );
  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const taskCtx = useContext(TaskContext);

  const removeTask = () => {
    dispatch(taskAction.removeTask(task!.id));
  };

  const btnDeleteSrc = taskCtx.isLightTheme
    ? "https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
    : "https://img.icons8.com/material-outlined/24/ffffff/delete-sign.png";
  const btnEditSrc = taskCtx.isLightTheme
    ? "https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
    : "https://img.icons8.com/material-outlined/24/ffffff/edit--v1.png";
  return (
    <li className={`${classes.item} ${classes[task!.status]}`}>
      <div className={classes.title}>{task!.title}</div>
      <div className={classes.actions}>
        <img onClick={removeTask} src={btnDeleteSrc} alt="Delete" />
        <Link to={`/tasks/${task!.id}`}>
          <img src={btnEditSrc} alt="Edit" />
        </Link>
        {/* <img onClick={openDetailModal} src={btnEditSrc} alt="Edit" /> </Link> */}
      </div>
    </li>
  );
};

export default Task;
