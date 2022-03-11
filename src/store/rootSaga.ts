import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import tasksSaga from "./tasksSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([tasksSaga(), authSaga(), userSaga()]);
}
