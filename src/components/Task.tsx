import React, { Dispatch, useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import Todo from "../models/todo";
import { TaskStateObj } from "../store";
import { TaskContext } from "../store/task-context";
import classes from './Task.module.css';


const Task: React.FC<{id : string}> = (props) => {
    const task = useSelector<TaskStateObj, Todo | undefined>(state => state.taskList.find(item => item.id === props.id));
    const dispatch = useDispatch<Dispatch<AnyAction>>();
    const taskCtx = useContext(TaskContext);

    const removeTask = () => {
        dispatch({type: 'remove', payload: task!.id})
    }

    const openDetailModal = () => {
        dispatch({type: 'toggle', payload: task});
    }
    return <li className={`${classes.item} ${classes[task!.status]}`}>
        <div className={classes.title}>{task!.title}</div>
        <div className={classes.actions}>
            {!taskCtx.isLightTheme && <img onClick={removeTask} src="https://img.icons8.com/material-outlined/24/ffffff/delete-sign.png"/>}
            {!taskCtx.isLightTheme && <img onClick={openDetailModal} src="https://img.icons8.com/material-outlined/24/ffffff/edit--v1.png"/>}
            {taskCtx.isLightTheme && <img onClick={removeTask} src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"/>}
            {taskCtx.isLightTheme && <img onClick={openDetailModal} src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/>}
        </div>
    </li>
}

export default Task;