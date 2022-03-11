import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../models/todo";

export type TaskStateObj = {
  taskList: Todo[];
};

export interface TaskPayload {
  title: string;
  status: string;
}

const initialState: TaskStateObj = {
  taskList: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    getAllTask(state) {},
    setListTask(state, action: PayloadAction<Todo[]>) {
      state.taskList = action.payload;
    },
    addNewTask(state, action: PayloadAction<TaskPayload>) {},
    addNewTaskSuccess(state, action: PayloadAction<Todo>) {
      state.taskList = state.taskList.concat(action.payload);
    },
    updateTask(state, action: PayloadAction<Todo>) {},
    updateTaskSuccess(state, action: PayloadAction<Todo>) {
      state.taskList = state.taskList.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    filterTask(state, action: PayloadAction<string>) {},
    removeTask(state, action: PayloadAction<string>) {
      state.taskList = state.taskList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const taskAction = taskSlice.actions;

// export const selectAllTask = (state: any) => state.task.taskList.map(item => item.id)

export default taskSlice.reducer;
