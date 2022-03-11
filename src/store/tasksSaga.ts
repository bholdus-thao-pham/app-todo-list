import { put, call } from "redux-saga/effects";
import Todo from "../models/todo";
import taskApi from "../service/task";
import { taskAction, TaskPayload } from "./tasksSlice";
import * as Effects from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

const takeLatest: any = Effects.takeLatest;

function* addNewTask(action: PayloadAction<TaskPayload>) {
  const id: string = yield call(taskApi.addNewTask, action.payload);
  yield put(
    taskAction.addNewTaskSuccess({
      id,
      ...action.payload,
    })
  );
}

function* filterTask(action: PayloadAction<string>) {
  const listTask: Todo[] = yield call(taskApi.getAllTask);
  if (action.payload === "all") {
    yield put(taskAction.setListTask(listTask));
  } else {
    const filtedList = listTask.filter(
      (item) => item.status === action.payload
    );
    yield put(taskAction.setListTask(filtedList));
  }
}
function* updateTask(action: PayloadAction<Todo>) {
  const task: Todo = yield call(taskApi.updateTask, action.payload);
  yield put(taskAction.updateTaskSuccess(task));
}

function* removeTask(action: PayloadAction<string>) {
  yield call(taskApi.deleteTask, action.payload);
}

function* fetchAllTasks() {
  const listTask: Todo[] = yield call(taskApi.getAllTask);
  yield put(taskAction.setListTask(listTask));
}

export default function* tasksSaga() {
  yield takeLatest(taskAction.getAllTask, fetchAllTasks);
  yield takeLatest(taskAction.addNewTask.type, addNewTask);
  yield takeLatest(taskAction.removeTask.type, removeTask);
  yield takeLatest(taskAction.updateTask.type, updateTask);
  yield takeLatest(taskAction.filterTask.type, filterTask);
}
