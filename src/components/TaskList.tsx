import { shallowEqual, useSelector } from "react-redux";
import { TaskStateObj } from "../store";
import Task from "./Task";
import classes from './TaskList.module.css'

const TodoList = () => {
    const taskIds = useSelector<TaskStateObj, string[]>(state => state.taskList.map(item => item.id), shallowEqual);
    return <ul className={classes.ul}>
        {taskIds.map(item => <Task key={item} id={item}/>)}
    </ul>
}

export default TodoList