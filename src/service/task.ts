import { FIRE_BASE_URL } from "../utils/const";
import Todo from "../models/todo";
import { TaskPayload } from "../store/tasksSlice";

const getAllTask = async (): Promise<Todo[]> => {
  console.log("Call api to get all task");
  const response = await fetch(`${FIRE_BASE_URL}/tasks.json`);
  const data = await response.json();
  const convertedTask = [] as Todo[];
  for (let id in data) {
    convertedTask.push({
      id: id,
      ...data[id],
    });
  }
  return convertedTask;
};

const addNewTask = async (task: TaskPayload): Promise<string> => {
  console.log("Call api to add a new task");
  const response = await fetch(`${FIRE_BASE_URL}/tasks.json`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.name;
};

const deleteTask = async (id: string): Promise<void> => {
  console.log("Call api to delete a task");
  await fetch(`${FIRE_BASE_URL}/tasks/${id}.json`, {
    method: "DELETE",
  });
};

const updateTask = async (task: Todo): Promise<Todo> => {
  console.log("Call api to update a task");
  const response = await fetch(`${FIRE_BASE_URL}/tasks/${task.id}.json`, {
    method: "PUT",
    body: JSON.stringify({ status: task.status, title: task.title }),
  });
  const data = await response.json();
  return {
    id: task.id,
    ...data,
  };
};

const getTaskById = async (id: string): Promise<Todo> => {
  console.log("Call api to get a task by id: ", id);
  const response = await fetch(`${FIRE_BASE_URL}/tasks/${id}.json`);
  const data = await response.json();
  return {
    id,
    ...data,
  };
};
const taskApi = {
  getAllTask,
  addNewTask,
  deleteTask,
  updateTask,
  getTaskById,
};
export default taskApi;
