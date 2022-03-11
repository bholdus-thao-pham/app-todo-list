import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, take, fork, select } from "redux-saga/effects";
import User from "../models/user";
import userApi from "../service/user";
import { authActions, LoginPayload, selectLoggin } from "./authSlice";
import { push } from "connected-react-router";

function* login(action: LoginPayload) {
  const users: User[] = yield call(userApi.getAllUser);
  let isLoggedIn: Boolean = false;
  for (let user of users) {
    if (
      user.email.toLocaleLowerCase() === action.email.toLocaleLowerCase() &&
      user.password + "" === action.password
    ) {
      isLoggedIn = true;
      break;
    }
  }
  if (isLoggedIn) {
    yield put(authActions.loginSuccess());
    yield put(push("/tasks"));
  } else {
    yield put(authActions.loginFail);
  }
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedin: boolean = yield select(selectLoggin);
    console.log("Login infor from persist", isLoggedin);
    if (!isLoggedin) {
      const action: PayloadAction<LoginPayload> = yield take(
        authActions.login.type
      );
      yield fork(login, action.payload);
    } else {
      yield take(authActions.logout.type);
      yield put(authActions.logout);
    }
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
