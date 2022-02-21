import React, { Dispatch, useContext } from "react"
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { isTemplateExpression } from "typescript";
import Todo from "../models/todo";
import { TaskContext } from "../store/task-context";
import classes from './Task.module.css';

const Task: React.FC<{item : Todo}> = (props) => {
    const style = props.item.status;
    const dispatch = useDispatch<Dispatch<AnyAction>>();
    const taskCtx = useContext(TaskContext);

    const removeTask = () => {
        dispatch({type: 'remove', id: props.item.id})
    }

    const openDetailModal = () => {
        dispatch({type: 'toggle', selectedTask: props.item});
    }
    return <li className={`${classes.item} ${classes[style]}`}>
        <div className={classes.title}>{props.item.title}</div>
        <div className={classes.actions}>
            {!taskCtx.isLightTheme && <img onClick={removeTask} src="https://img.icons8.com/material-outlined/24/ffffff/delete-sign.png"/>}
            {!taskCtx.isLightTheme && <img onClick={openDetailModal} src="https://img.icons8.com/material-outlined/24/ffffff/edit--v1.png"/>}
            {taskCtx.isLightTheme && <img onClick={removeTask} src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"/>}
            {taskCtx.isLightTheme && <img onClick={openDetailModal} src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"/>}
        </div>
    </li>
}

export default Task;