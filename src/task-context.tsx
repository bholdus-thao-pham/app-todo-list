import React, { useState } from "react";

type TaskContextObject = {
  isLightTheme: boolean;
  changeTheme: () => void;
};

export const TaskContext = React.createContext<TaskContextObject>({
  isLightTheme: true,
  changeTheme: () => {},
});

const TaskContextProvider: React.FC = (props) => {
  const [isLightTheme, setIsLightTheme] = useState(false);

  const changeTheme = () => {
    setIsLightTheme((prevState) => {
      // document.documentElement.setAttribute('data-theme', prevState ? "dark" : 'light')
      return !prevState;
    });
  };

  const taskCtxValue: TaskContextObject = {
    isLightTheme: isLightTheme,
    changeTheme: changeTheme,
  };
  return (
    <TaskContext.Provider value={taskCtxValue}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
