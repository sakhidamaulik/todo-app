import { ITask } from "./../Models/Tasks.Models";
import axios from "axios";

const BASE_URL = "http://localhost:3004";
export const tasksService = {
  createTask: async (task: ITask): Promise<ITask> => {
    const url = `${BASE_URL}/tasks`;
    const response = await axios.post<ITask>(url, task);

    return response.data;
  },

  updateTask: async (task: ITask): Promise<ITask> => {
    const url = `${BASE_URL}/tasks/${task.id}`;
    const response = await axios.put<ITask>(url, task);

    return response.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    const url = `${BASE_URL}/tasks/${taskId}`;

    return await axios.delete(url);
  },

  getTasks: async (taskListId: string): Promise<ITask[]> => {
    const url = `${BASE_URL}/tasks?taskListId=${taskListId}`;
    const response = await axios.get<ITask[]>(url);

    return response.data;
  },

  getTask: async (taskId: string): Promise<ITask> => {
    const url = `${BASE_URL}/tasks/${taskId}`;
    const response = await axios.get<ITask>(url);

    return response.data;
  },
};
