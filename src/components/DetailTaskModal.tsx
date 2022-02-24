import React, {useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { LIST_STATUS } from '../models/const';
import Todo from '../models/todo';
import { TaskContext } from '../store/task-context';
import classes from './DetailTaskModal.module.css';
import Button from './UI/Button';
import SelectOption from './UI/SelectOption';

const DetailTaskModal: React.FC<{item: Todo}> = (props) => {
    const [title, setTitle] = useState(props.item.title);
    const [status, setSatus] = useState(props.item.status);
    const taskCtx = useContext(TaskContext);
    const [isValidTitle, setIsValidTitle] = useState<boolean>(true);

    const dispatch = useDispatch<Dispatch<AnyAction>>();
    const updateTask = (event: React.FormEvent) => {
        event.preventDefault()
        if(title.trim() === ''){
            setIsValidTitle(false)
            return;
        }
        const item = {...props.item};
        item.status = status;
        item.title = title;
        dispatch({type: 'update', payload: item});
        closeModal();
    }

    const changeStatus = (status: string) => {
        setSatus(status);
    }

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value.trim() === '' ? setIsValidTitle(false): setIsValidTitle(true);
        setTitle(event.target.value)
    }

    const closeModal = () => {
        dispatch({type:'toggle', payload: {} as Todo})

    }
    return <div className={classes.modal}>
        <div className={classes.content}> 
            {!taskCtx.isLightTheme && <img src="https://img.icons8.com/material-outlined/24/ffffff/delete-sign.png" onClick={closeModal}/>}
            {taskCtx.isLightTheme && <img src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png" onClick={closeModal}/>}
            <form onSubmit={updateTask} className={classes['form-controls']}>
                <div className={`${classes.title} ${!isValidTitle ? classes.invalid:''}`}>
                    <input type="text" value={title} onChange={changeTitle}/>
                </div>
                <div className={classes.status}>
                    <SelectOption listOption={LIST_STATUS} defaultValue={status} onChangeValue={changeStatus}/>
                </div>
                <div className={classes.action}>
                    <Button label={"UPDATE"}/>
                </div>
            </form>
        </div>

    </div>
}

export default DetailTaskModal