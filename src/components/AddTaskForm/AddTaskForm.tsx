import React, { useState } from "react";
import { LIST_STATUS } from "../../utils/const";
import classes from "./AddTaskForm.module.css";
import Button from "../BaseElements/Button/Button";
import SelectOption from "../BaseElements/SelectOption/SelectOption";
import { useDispatch } from "react-redux";
import { taskAction } from "../../store/tasksSlice";
import { AppDispatch } from "../../store";

const AddTaskForm = () => {
  const [title, setTitle] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [titleInputTouched, setTitleInputTouched] = useState(false);
  const [status, setStatus] = useState("todo");
  const dispatch = useDispatch<AppDispatch>();

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleInputTouched(true);
    if (title.trim() === "") {
      setIsValidForm(false);
      return;
    }
    setIsValidForm(true);
    const newTask = {
      title: title,
      status: status,
    };
    dispatch(taskAction.addNewTask(newTask));
    setTitle("");
    setStatus("todo");
  };

  const changeStatus = (status: string) => {
    setStatus(status);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredTitle = event.target.value;
    setTitle(enteredTitle);
    enteredTitle.trim() === "" ? setIsValidForm(false) : setIsValidForm(true);
  };

  const titleBlur = () => {
    setTitleInputTouched(true);
    if (title.trim() === "") {
      setIsValidForm(false);
    }
  };

  return (
    <form onSubmit={submitForm} className={classes["form-controls"]}>
      <div
        className={`${classes.title} ${
          !isValidForm && titleInputTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          placeholder="Enter your task title"
          onChange={changeTitle}
          onBlur={titleBlur}
        />
      </div>
      <div className={classes.title}>
        <label>Status</label>
        <SelectOption
          listOption={LIST_STATUS}
          defaultValue={status}
          onChangeValue={changeStatus}
        />
      </div>
      <div className={classes.action}>
        <Button label={"ADD TASK"} />
      </div>
    </form>
  );
};

export default AddTaskForm;
