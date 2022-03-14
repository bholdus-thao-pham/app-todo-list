import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { taskAction } from "../../store/tasksSlice";
import Task from "../Task/Task";
import classes from "./TaskList.module.css";

const TaskList = React.memo(() => {
  console.log("todo list is rendering..");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(taskAction.getAllTask());
  }, [dispatch]);
  const taskIds = useSelector<RootState, string[]>(
    (state) => state.task.taskList.map((item) => item?.id),
    shallowEqual
  );
  const listTask =
    !taskIds || taskIds.length === 0 ? (
      <h2>No task found</h2>
    ) : (
      taskIds.map((item) => <Task key={item} id={item} />)
    );
  return <ul className={classes.ul}>{listTask}</ul>;
});

export default TaskList;
