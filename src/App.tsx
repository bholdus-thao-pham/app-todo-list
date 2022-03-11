import React, { useContext } from "react";
import ToggleTheme from "./components/ToggleTheme/ToggleTheme";
import { TaskContext } from "./task-context";
import classes from "./App.module.css";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ListTaskPage from "./pages/ListTaskPage/ListTaskPage";
import Header from "./components/Header/Header";
import TaskDetail from "./pages/TaskDetail/TaskDetail";
import UsersPage from "./pages/UsersPage/UsersPage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { selectLoggin } from "./store/authSlice";

function App() {
  const isAuthenticated = useSelector<RootState, boolean>(selectLoggin);
  const taskCtx = useContext(TaskContext);
  document.documentElement.setAttribute(
    "data-theme",
    !taskCtx.isLightTheme ? "dark" : "light"
  );

  return (
    <React.Fragment>
      <Header />
      <div className={classes.app}>
        <ToggleTheme />
      </div>
      <main>
        <Switch>
          <Route path="/" exact>
            {isAuthenticated && <Redirect to="/tasks"></Redirect>}
            {!isAuthenticated && <Redirect to="/login"></Redirect>}
          </Route>
          {!isAuthenticated && (
            <Route path="/login">
              <LoginPage />
            </Route>
          )}
          <Route path="/tasks" exact>
            {isAuthenticated && <ListTaskPage />}
            {!isAuthenticated && <Redirect to="/login"></Redirect>}
          </Route>

          <Route path="/tasks/:taskId">
            {isAuthenticated && <TaskDetail />}
            {!isAuthenticated && <Redirect to="/login"></Redirect>}
          </Route>
          <Route path="/users">
            {isAuthenticated && <UsersPage />}
            {!isAuthenticated && <Redirect to="/login"></Redirect>}
          </Route>
          <Route path="*">
            {!isAuthenticated && <Redirect to="/login"></Redirect>}
            {isAuthenticated && <h2>Page not found!</h2>}
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
