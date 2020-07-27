import { ITaskList } from "../Models/Tasks.Models";
import axios from "axios";

const BASE_URL = "http://localhost:3004";

export const taskListService = {
  createTaskList: async (taskList: ITaskList): Promise<ITaskList> => {
    const url = `${BASE_URL}/tasklists`;
    const response = await axios.post<ITaskList>(url, taskList);

    return response.data;
  },

  updateTaskList: async (taskList: ITaskList): Promise<ITaskList> => {
    const url = `${BASE_URL}/tasklists/${taskList.id}`;
    const response = await axios.put<ITaskList>(url, taskList);

    return response.data;
  },

  deleteTaskList: async (taskListId: string): Promise<void> => {
    const url = `${BASE_URL}/tasklists/${taskListId}`;
    return await axios.delete(url);
  },

  getTaskLists: async (): Promise<ITaskList[]> => {
    const url = `${BASE_URL}/tasklists`;
    const response = await axios.get<ITaskList[]>(url);

    return response.data;
  },

  getTaskList: async (taskListId: string): Promise<ITaskList> => {
    const url = `${BASE_URL}/tasklists/${taskListId}`;
    const response = await axios.get<ITaskList>(url);

    return response.data;
  },
};
