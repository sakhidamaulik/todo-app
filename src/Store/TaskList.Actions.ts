import { ITaskList } from "./../Models/Tasks.Models";

export interface Action<T extends string, U> {
  readonly type: T;
  readonly payload: U;
}

export function createAction<T extends string, U extends any>(
  type: T,
  payload: U
): Action<T, U> {
  return {
    type,
    payload,
  };
}

export enum TaskListActionTypes {
  CREATE_TASKLIST = "Create Tasklist",
  CREATE_TASKLIST_SUCCESS = "Create Tasklist Success",
  CREATE_TASKLIST_FAILURE = "Create Tasklist Failure",
  UPDATE_TASKLIST = "Update Tasklist",
  UPDATE_TASKLIST_SUCCESS = "Update Tasklist Success",
  UPDATE_TASKLIST_FAILURE = "Update Tasklist Failure",
  DELETE_TASKLIST = "Delete Tasklist",
  DELETE_TASKLIST_SUCCESS = "Delete Tasklist Success",
  DELETE_TASKLIST_FAILURE = "Delete Tasklist Failure",
  GET_TASKLISTS = "Get Tasklists",
  GET_TASKLISTS_SUCCESS = "Get Tasklists Success",
  GET_TASKLISTS_FAILURE = "Get Tasklists Failure",
  GET_TASKLIST = "Get Tasklist",
  GET_TASKLIST_SUCCESS = "Get Tasklist Success",
  GET_TASKLIST_FAILURE = "Get Tasklist Failure",
}

export const TaskListActions = {
  CreateTaskList: (
    taskList: ITaskList
  ): Action<TaskListActionTypes.CREATE_TASKLIST, ITaskList> => {
    return createAction(TaskListActionTypes.CREATE_TASKLIST, taskList);
  },
  CreateTaskListSuccess: (
    taskList: ITaskList
  ): Action<TaskListActionTypes.CREATE_TASKLIST_SUCCESS, ITaskList> =>
    createAction(TaskListActionTypes.CREATE_TASKLIST_SUCCESS, taskList),
  CreateTaskListFailure: (
    error: Error
  ): Action<TaskListActionTypes.CREATE_TASKLIST_FAILURE, Error> =>
    createAction(TaskListActionTypes.CREATE_TASKLIST_FAILURE, error),

  UpdateTaskList: (
    taskList: ITaskList
  ): Action<TaskListActionTypes.UPDATE_TASKLIST, ITaskList> => {
    return createAction(TaskListActionTypes.UPDATE_TASKLIST, taskList);
  },
  UpdateTaskListSuccess: (
    taskList: ITaskList
  ): Action<TaskListActionTypes.UPDATE_TASKLIST_SUCCESS, ITaskList> =>
    createAction(TaskListActionTypes.UPDATE_TASKLIST_SUCCESS, taskList),
  UpdateTaskListFailure: (
    error: Error
  ): Action<TaskListActionTypes.UPDATE_TASKLIST_FAILURE, Error> =>
    createAction(TaskListActionTypes.UPDATE_TASKLIST_FAILURE, error),

  DeleteTaskList: (
    id: string
  ): Action<TaskListActionTypes.DELETE_TASKLIST, string> => {
    return createAction(TaskListActionTypes.DELETE_TASKLIST, id);
  },
  DeleteTaskListSuccess: (
    id: string
  ): Action<TaskListActionTypes.DELETE_TASKLIST_SUCCESS, string> =>
    createAction(TaskListActionTypes.DELETE_TASKLIST_SUCCESS, id),
  DeleteTaskListFailure: (
    error: Error
  ): Action<TaskListActionTypes.DELETE_TASKLIST_FAILURE, Error> =>
    createAction(TaskListActionTypes.DELETE_TASKLIST_FAILURE, error),

  GetTaskLists: (): Action<TaskListActionTypes.GET_TASKLISTS, {}> => {
    return createAction(TaskListActionTypes.GET_TASKLISTS, {});
  },
  GetTaskListsSuccess: (
    taskLists: ITaskList[]
  ): Action<TaskListActionTypes.GET_TASKLISTS_SUCCESS, ITaskList[]> =>
    createAction(TaskListActionTypes.GET_TASKLISTS_SUCCESS, taskLists),
  GetTaskListsFailure: (
    error: Error
  ): Action<TaskListActionTypes.GET_TASKLISTS_FAILURE, Error> =>
    createAction(TaskListActionTypes.GET_TASKLISTS_FAILURE, error),

  GetTaskList: (
    taskListId: string
  ): Action<TaskListActionTypes.GET_TASKLIST, string> => {
    return createAction(TaskListActionTypes.GET_TASKLIST, taskListId);
  },
  GetTaskListSuccess: (
    taskList: ITaskList
  ): Action<TaskListActionTypes.GET_TASKLIST_SUCCESS, ITaskList> =>
    createAction(TaskListActionTypes.GET_TASKLIST_SUCCESS, taskList),
  GetTaskListFailure: (
    error: Error
  ): Action<TaskListActionTypes.GET_TASKLIST_FAILURE, Error> =>
    createAction(TaskListActionTypes.GET_TASKLIST_FAILURE, error),
};

export type TaskListActionsAllTypes =
  | ReturnType<typeof TaskListActions.CreateTaskList>
  | ReturnType<typeof TaskListActions.CreateTaskListSuccess>
  | ReturnType<typeof TaskListActions.CreateTaskListFailure>
  | ReturnType<typeof TaskListActions.UpdateTaskList>
  | ReturnType<typeof TaskListActions.UpdateTaskListSuccess>
  | ReturnType<typeof TaskListActions.UpdateTaskListFailure>
  | ReturnType<typeof TaskListActions.DeleteTaskList>
  | ReturnType<typeof TaskListActions.DeleteTaskListSuccess>
  | ReturnType<typeof TaskListActions.DeleteTaskListFailure>
  | ReturnType<typeof TaskListActions.GetTaskList>
  | ReturnType<typeof TaskListActions.GetTaskListSuccess>
  | ReturnType<typeof TaskListActions.GetTaskListFailure>
  | ReturnType<typeof TaskListActions.GetTaskLists>
  | ReturnType<typeof TaskListActions.GetTaskListsSuccess>
  | ReturnType<typeof TaskListActions.GetTaskListsFailure>;
