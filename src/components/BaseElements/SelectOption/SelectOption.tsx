import React from "react";
import classes from './SelectOption.module.css';

const SelectOption: React.FC<
{
    listOption: string[];
    onChangeValue: (value: string)=> void;
    defaultValue: string
    }> = React.memo((props) => {

    const changeValueHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        props.onChangeValue(value);
    }

    return <select value={props.defaultValue} onChange={changeValueHandler} className={classes.select}>
        {props.listOption.map(item => <option value={item} key={item}>{item}</option>)}
    </select>
})

export default SelectOption;