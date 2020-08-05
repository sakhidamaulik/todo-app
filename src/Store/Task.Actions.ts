import {
  ITask,
  ICreateOrUpdateTaskParams,
  IDeleteTaskParams,
} from "../Models/Tasks.Models";

export interface Action<T extends string, U> {
  readonly type: T;
  readonly payload: U;
}

export function createAction<T extends string, U>(
  type: T,
  payload: U
): Action<T, U> {
  return {
    type,
    payload,
  };
}

export enum TaskActionTypes {
  CREATE_TASK = "Create Task",
  CREATE_TASK_SUCCESS = "Create Task Success",
  CREATE_TASK_FAILURE = "Create Task Failure",
  UPDATE_TASK = "Update Task",
  UPDATE_TASK_SUCCESS = "Update Task Success",
  UPDATE_TASK_FAILURE = "Update Task Failure",
  DELETE_TASK = "Delete Task",
  DELETE_TASK_SUCCESS = "Delete Task Success",
  DELETE_TASK_FAILURE = "Delete Task Failure",
  GET_TASKS = "Get Tasks",
  GET_TASKS_SUCCESS = "Get Tasks Success",
  GET_TASKS_FAILURE = "Get Tasks Failure",
  GET_TASK = "Get Task",
  GET_TASK_SUCCESS = "Get Task Success",
  GET_TASK_FAILURE = "Get Task Failure",
}

export const TaskActions = {
  CreateTask: (
    params: ICreateOrUpdateTaskParams
  ): Action<TaskActionTypes.CREATE_TASK, ICreateOrUpdateTaskParams> => {
    return createAction(TaskActionTypes.CREATE_TASK, params);
  },
  CreateTaskSuccess: (
    task: ITask
  ): Action<TaskActionTypes.CREATE_TASK_SUCCESS, ITask> => {
    return createAction(TaskActionTypes.CREATE_TASK_SUCCESS, task);
  },
  CreateTaskFailure: (
    error: Error
  ): Action<TaskActionTypes.CREATE_TASK_FAILURE, Error> => {
    return createAction(TaskActionTypes.CREATE_TASK_FAILURE, error);
  },

  UpdateTask: (
    params: ICreateOrUpdateTaskParams
  ): Action<TaskActionTypes.UPDATE_TASK, ICreateOrUpdateTaskParams> => {
    return createAction(TaskActionTypes.UPDATE_TASK, params);
  },
  UpdateTaskSuccess: (
    task: ITask
  ): Action<TaskActionTypes.UPDATE_TASK_SUCCESS, ITask> => {
    return createAction(TaskActionTypes.UPDATE_TASK_SUCCESS, task);
  },
  UpdateTaskFailure: (
    error: Error
  ): Action<TaskActionTypes.UPDATE_TASK_FAILURE, Error> => {
    return createAction(TaskActionTypes.UPDATE_TASK_FAILURE, error);
  },

  DeleteTask: (
    params: IDeleteTaskParams
  ): Action<TaskActionTypes.DELETE_TASK, IDeleteTaskParams> => {
    return createAction(TaskActionTypes.DELETE_TASK, params);
  },
  DeleteTaskSuccess: (
    params: IDeleteTaskParams
  ): Action<TaskActionTypes.DELETE_TASK_SUCCESS, IDeleteTaskParams> => {
    return createAction(TaskActionTypes.DELETE_TASK_SUCCESS, params);
  },
  DeleteTaskFailure: (
    error: Error
  ): Action<TaskActionTypes.DELETE_TASK_FAILURE, Error> => {
    return createAction(TaskActionTypes.DELETE_TASK_FAILURE, error);
  },

  GetTasks: (taskListId: string): Action<TaskActionTypes.GET_TASKS, string> => {
    return createAction(TaskActionTypes.GET_TASKS, taskListId);
  },
  GetTasksSuccess: (
    tasks: ITask[]
  ): Action<TaskActionTypes.GET_TASKS_SUCCESS, ITask[]> =>
    createAction(TaskActionTypes.GET_TASKS_SUCCESS, tasks),
  GetTasksFailure: (
    error: Error
  ): Action<TaskActionTypes.GET_TASKS_FAILURE, Error> =>
    createAction(TaskActionTypes.GET_TASKS_FAILURE, error),

  GetTask: (taskId: string): Action<TaskActionTypes.GET_TASK, string> => {
    return createAction(TaskActionTypes.GET_TASK, taskId);
  },
  GetTaskSuccess: (
    task: ITask
  ): Action<TaskActionTypes.GET_TASK_SUCCESS, ITask> =>
    createAction(TaskActionTypes.GET_TASK_SUCCESS, task),
  GetTaskFailure: (
    error: Error
  ): Action<TaskActionTypes.GET_TASK_FAILURE, Error> =>
    createAction(TaskActionTypes.GET_TASK_FAILURE, error),
};

export type TaskActionAllTypes =
  | ReturnType<typeof TaskActions.CreateTask>
  | ReturnType<typeof TaskActions.CreateTaskSuccess>
  | ReturnType<typeof TaskActions.CreateTaskFailure>
  | ReturnType<typeof TaskActions.UpdateTask>
  | ReturnType<typeof TaskActions.UpdateTaskSuccess>
  | ReturnType<typeof TaskActions.UpdateTaskFailure>
  | ReturnType<typeof TaskActions.DeleteTask>
  | ReturnType<typeof TaskActions.DeleteTaskSuccess>
  | ReturnType<typeof TaskActions.DeleteTaskFailure>
  | ReturnType<typeof TaskActions.GetTasks>
  | ReturnType<typeof TaskActions.GetTasksSuccess>
  | ReturnType<typeof TaskActions.GetTasksFailure>
  | ReturnType<typeof TaskActions.GetTask>
  | ReturnType<typeof TaskActions.GetTaskSuccess>
  | ReturnType<typeof TaskActions.GetTaskFailure>;
