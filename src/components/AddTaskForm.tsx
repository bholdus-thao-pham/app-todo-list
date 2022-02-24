import React, { ChangeEvent, useRef, useState } from "react";
import { LIST_STATUS } from "../models/const";
import classes from './AddTaskForm.module.css';
import Button from "./UI/Button";
import SelectOption from "./UI/SelectOption";

const AddTaskForm: React.FC<{addTask: (title : string, status: string)=> void}> = (props) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>('');
    const [isValidForm, setIsValidForm] = useState(false);
    const [titleInputTouched, setTitleInputTouched] = useState(false);
    const [status, setStatus] = useState('todo');

    const submitForm = (event : React.FormEvent) => {
        event.preventDefault();
        setTitleInputTouched(true)
        if(title.trim() === ''){
            setIsValidForm(false);
            return;
        }
        setIsValidForm(true)
        props.addTask(title, status);
        setTitle("");
        setStatus('todo');

    }
    
    const changeStatus = (status: string) => {
        setStatus(status);
    }
    
    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredTitle = event.target.value;
        setTitle(enteredTitle);
        enteredTitle.trim() === '' ? setIsValidForm(false) : setIsValidForm(true);
        
    }

    const titleBlur = () => {
        setTitleInputTouched(true);
        if(title.trim() === ''){
            setIsValidForm(false);
        }
    }


    return <form onSubmit={submitForm} className={classes['form-controls']}>
        <div className={`${classes.title} ${!isValidForm && titleInputTouched ? classes.invalid:''}`}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} placeholder="Enter your task title"
                onChange={changeTitle} onBlur={titleBlur}/>
        </div>
        <div className={classes.title}>
            <label >Status</label>
            <SelectOption listOption={LIST_STATUS} defaultValue={status} onChangeValue={changeStatus}/>
        </div>
        <div className={classes.action}>
            <Button label={"ADD TASK"}/>
        </div>
    </form>
}

export default AddTaskForm;
