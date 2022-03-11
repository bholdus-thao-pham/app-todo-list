import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { RootState } from "../../store";
import { selectLoggin } from "../../store/authSlice";
import classes from "./Header.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { AppDispatch } from "../../store";

const Header = () => {
  const isAuthenticated = useSelector<RootState, Boolean>(selectLoggin);
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/login");
  };
  return (
    <header className={classes.header}>
      <ul>
        {isAuthenticated && (
          <li>
            <NavLink activeClassName={classes.active} to="/tasks">
              Home
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <NavLink activeClassName={classes.active} to="/users">
              Users
            </NavLink>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <NavLink activeClassName={classes.active} to="/login">
              Login
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
