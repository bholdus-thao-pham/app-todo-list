import { useState } from "react";
import { useDispatch } from "react-redux";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import SelectOption from "../../components/BaseElements/SelectOption/SelectOption";
import TaskList from "../../components/TaskList/TaskList";
import { AppDispatch } from "../../store";
import { taskAction } from "../../store/tasksSlice";
import classes from "./ListTaskPage.module.css";

const ListTaskPage = () => {
  const [filterValue, setFilterValue] = useState("all");
  const dispatch = useDispatch<AppDispatch>();

  const filterHandler = (value: string) => {
    setFilterValue(value);
    dispatch(taskAction.filterTask(value));
  };
  return (
    <div>
      <div className={classes.filter}>
        <span>Filter</span>
        <SelectOption
          listOption={["all", "todo", "inprogress", "done"]}
          defaultValue={filterValue}
          onChangeValue={filterHandler}
        />
      </div>
      <AddTaskForm />
      <TaskList />
    </div>
  );
};

export default ListTaskPage;
