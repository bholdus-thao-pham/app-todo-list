import Todo from "./todo";

export type TaskStateObj = {
  taskList: Todo[];
  isOpenDetailModal: boolean;
  selectedTask: Todo;
};
