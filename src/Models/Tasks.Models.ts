export enum LoadState {
  Initial,
  Loading,
  LoadSuccessful,
  LoadFailed,
}

export interface ITask {
  id: string;
  title: string;
  taskListId: string;
  createdAt: string;
}

export interface ITaskList {
  id: string;
  title: string;
  createdAt: string;
  tasks: ITask[];
}

export interface ITaskParams {
  taskListId: string;
  taskId: string;
}

export interface IDeleteTaskParams extends ITaskParams {}
export interface IGetTaskParams extends ITaskParams {}

export interface IDeleteTaskResult {
  taskListId: string;
  taskId: string;
}

export interface IGetTasksResult {
  taskListId: string;
  tasks: ITask[];
}

export interface IGetTaskResult {
  taskListId: string;
  task: ITask;
}
