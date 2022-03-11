import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { LIST_STATUS } from "../../utils/const";
import Todo from "../../models/todo";
import { TaskContext } from "../../task-context";
import classes from "./DetailTaskModal.module.css";
import Button from "../BaseElements/Button/Button";
import SelectOption from "../BaseElements/SelectOption/SelectOption";
import { taskAction } from "../../store/tasksSlice";
import { useHistory, useParams } from "react-router-dom";
import taskApi from "../../service/task";

const DetailTaskModal = () => {
  const params = useParams<{ taskId: string }>();
  const taskId = params.taskId;
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [status, setSatus] = useState("");
  const [task, setTask] = useState<Todo>({} as Todo);
  useEffect(() => {
    if (!taskId) return;
    (async () => {
      try {
        const data: Todo = await taskApi.getTaskById(taskId);
        console.log("get task by id: ", data);
        setTask(data);
        setTitle(data.title);
        setSatus(data.status);
      } catch (error) {
        console.log("get task failed", error);
      }
    })();
  }, [taskId]);

  const taskCtx = useContext(TaskContext);
  const [isValidTitle, setIsValidTitle] = useState<boolean>(true);

  const dispatch = useDispatch<Dispatch<AnyAction>>();
  const updateTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() === "") {
      setIsValidTitle(false);
      return;
    }
    const editedTask = {
      id: task.id,
      title,
      status,
    };
    dispatch(taskAction.updateTask(editedTask));
    closeModal();
  };

  const changeStatus = (status: string) => {
    setSatus(status);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value.trim() === ""
      ? setIsValidTitle(false)
      : setIsValidTitle(true);
    setTitle(event.target.value);
  };

  const closeModal = () => {
    history.push("/tasks");
  };

  const closeModalIcon = taskCtx.isLightTheme
    ? "https://img.icons8.com/material-outlined/24/000000/delete-sign.png"
    : "https://img.icons8.com/material-outlined/24/ffffff/delete-sign.png";
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <img src={closeModalIcon} onClick={closeModal} alt="Close" />
        <form onSubmit={updateTask} className={classes["form-controls"]}>
          <div
            className={`${classes.title} ${
              !isValidTitle ? classes.invalid : ""
            }`}
          >
            <input type="text" value={title} onChange={changeTitle} />
          </div>
          <div className={classes.status}>
            <SelectOption
              listOption={LIST_STATUS}
              defaultValue={status}
              onChangeValue={changeStatus}
            />
          </div>
          <div className={classes.action}>
            <Button label={"UPDATE"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailTaskModal;
