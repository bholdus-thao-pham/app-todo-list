import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../models/user";
import { AppDispatch, RootState } from "../../store";
import { selectAllUser, userActions } from "../../store/userSlice";
import classes from "./UserList.module.css";

const UserList = React.memo(() => {
  const listUsers = useSelector<RootState, User[]>(selectAllUser);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log("App component is rendering...");
    dispatch(userActions.getAllUser());
  }, [dispatch]);
  console.log("List user", listUsers);
  const tableData = () => {
    return listUsers.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{`${item.firstname} ${item.lastname}`}</td>
        <td>{item.email}</td>
      </tr>
    ));
  };
  return (
    <table className={classes.table}>
      <tbody>
        <tr className={classes.header}>
          <td>ID</td>
          <td>FULLNAME</td>
          <td>EMAIL</td>
        </tr>
        {tableData()}
      </tbody>
    </table>
  );
});

export default UserList;
