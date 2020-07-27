export enum LoadState {
  Initial,
  Loading,
  LoadSuccessful,
  LoadFailed,
}

export interface ITask {
  id: string;
  title: string;
}

export interface ITaskList {
  id: string;
  title: string;
  tasks?: ITask[];
  createdAt: string;
}
