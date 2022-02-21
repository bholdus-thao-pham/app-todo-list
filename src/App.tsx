import React, {Dispatch, useContext, useEffect, useState} from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import ToggleTheme from './components/ToggleTheme';
import Todo from './models/todo';
import TaskContextProvider, {TaskContext} from './store/task-context';
import classes from './App.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ReducerType, TaskStateObj } from './store';
import DetailTaskModal from './components/DetailTaskModal';

function App() {
    const taskCtx = useContext(TaskContext);
    const todoListStore = useSelector<TaskStateObj, Todo[]>(state => state.taskList);
    const dispatch = useDispatch<Dispatch<AnyAction>>();
    const isOpenModal = useSelector<ReducerType, boolean>(state => state.isOpenDetailModal);
    const selectedTask = useSelector<ReducerType, Todo>(state => state.selectedTask)
    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', !taskCtx.isLightTheme ? "dark" : 'light')
    },[])
    const addTask = (title : string, status: string) => {
        dispatch({type: 'add', title: title, status: status})
    }

    return <React.Fragment>
            {isOpenModal && <DetailTaskModal item={selectedTask}/>}
            <div className={classes.app}>
            <ToggleTheme/>
            <AddTaskForm addTask={addTask}/>
            <TaskList items={todoListStore}/>
            </div>
        </React.Fragment>

}

export default App;
