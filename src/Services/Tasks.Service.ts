import {
  ITask,
  ICreateOrUpdateTaskParams,
  IDeleteTaskParams,
  IGetTaskParams,
} from "./../Models/Tasks.Models";
import axios from "axios";

const BASE_URL = "http://localhost:3004";
export const tasksService = {
  createTask: async (params: ICreateOrUpdateTaskParams): Promise<ITask> => {
    const url = `${BASE_URL}/tasklists/${params.taskListId}/tasks`;
    const response = await axios.post<ITask>(url, params.task);

    return response.data;
  },

  updateTask: async (params: ICreateOrUpdateTaskParams): Promise<ITask> => {
    const url = `${BASE_URL}/tasklists/${params.taskListId}/tasks/${params.task.id}`;
    const response = await axios.put<ITask>(url, params.task);

    return response.data;
  },

  deleteTask: async (params: IDeleteTaskParams): Promise<void> => {
    const url = `${BASE_URL}/tasklists/${params.taskListId}/tasks/${params.taskId}`;

    return await axios.delete(url);
  },

  getTasks: async (taskListId: string): Promise<ITask[]> => {
    const url = `${BASE_URL}/tasklists/${taskListId}/tasks`;
    const response = await axios.get<ITask[]>(url);

    return response.data;
  },

  getTask: async (params: IGetTaskParams): Promise<ITask> => {
    const url = `${BASE_URL}/tasklists/${params.taskListId}/tasks/${params.taskId}`;
    const response = await axios.get<ITask>(url);

    return response.data;
  },
};
