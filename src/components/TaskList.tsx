import React from "react"
import Todo from "../models/todo"
import Task from "./Task";
import classes from './TaskList.module.css'

const TodoList: React.FC<{items: Todo[]}> = (props) => {
    return <ul className={classes.ul}>
        {props.items.map(item => <Task key={item.id} item ={item}/>)}
    </ul>
}

export default TodoList