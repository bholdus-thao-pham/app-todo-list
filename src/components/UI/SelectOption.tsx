import React, { useState } from "react";
import classes from './SelectOption.module.css';

const SelectOption: React.FC<
{
    listOption: string[];
    onChangeValue: (value: string)=> void;
    defaultValue?: string
    }> = (props) => {
    const [selectedValue, setSelectedValue] = useState(props.defaultValue);

    const changeValueHandler = (value: string) => {
        setSelectedValue(value);
        props.onChangeValue(value);
    }

    return <select value={selectedValue} onChange={e => changeValueHandler(e.target.value)} className={classes.select}>
        {props.listOption.map(item => <option value={item} key={item}>{item}</option>)}
    </select>
}

export default SelectOption;