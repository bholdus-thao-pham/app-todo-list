import { put, call } from "redux-saga/effects";
import userApi from "../service/user";
import { userActions } from "./userSlice";
import User from "../models/user";
import * as Effects from "redux-saga/effects";

const takeLatest: any = Effects.takeLatest;

function* fetchAllUsers() {
  console.log("USERSAGA....");
  const users: User[] = yield call(userApi.getAllUser);
  yield put(userActions.setListUser(users));
}

export default function* userSaga() {
  yield takeLatest(userActions.getAllUser, fetchAllUsers);
}
