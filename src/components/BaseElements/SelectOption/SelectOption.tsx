import React from "react";
import classes from "./SelectOption.module.css";

const SelectOption: React.FC<{
  listOption: string[];
  onChangeValue: (value: string) => void;
  defaultValue: string;
}> = React.memo((props) => {
  const { listOption, onChangeValue, defaultValue, ...restProps } = props;

  const changeValueHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChangeValue(value);
  };

  return (
    <select
      value={defaultValue}
      onChange={changeValueHandler}
      className={classes.select}
      {...restProps}
    >
      {listOption.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  );
});

export default SelectOption;
