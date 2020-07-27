import { ITask } from "../Models/Tasks.Models";
import axios from "axios";

const BASE_URL = "http://localhost:3004";
export const tasksService = {
  createTask: async (taskListId: string, task: ITask): Promise<ITask> => {
    const url = `${BASE_URL}/tasklists/${taskListId}/tasks`;
    const response = await axios.post<ITask>(url, task);

    return response.data;
  },

  updateTask: async (taskListId: string, task: ITask): Promise<ITask> => {
    const url = `${BASE_URL}/tasklists/${taskListId}/tasks/${task.id}`;
    const response = await axios.put<ITask>(url, task);

    return response.data;
  },

  deleteTask: async (taskListId: string, taskId: string): Promise<void> => {
    const url = `${BASE_URL}/tasklists/${taskListId}/tasks/${taskId}`;

    return await axios.delete(url);
  },

  getTasks: async (taskListId: string): Promise<ITask[]> => {
    const url = `${BASE_URL}/tasklists/${taskListId}/tasks`;
    const response = await axios.get<ITask[]>(url);

    return response.data;
  },

  getTask: async (taskListId: string, taskId: string): Promise<ITask> => {
    const url = `${BASE_URL}/tasklists/${taskListId}/tasks/${taskId}`;
    const response = await axios.get<ITask>(url);

    return response.data;
  },
};
