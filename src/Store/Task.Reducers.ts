import { ITask, LoadState } from "../Models/Tasks.Models";
import { TaskActionAllTypes, TaskActionTypes } from "./Task.Actions";

export interface ITaskState {
  tasksMap: { [taskListId: string]: ITask[] };
  taskLoadState: LoadState;
}

const initialState: ITaskState = {
  tasksMap: {},
  taskLoadState: LoadState.Initial,
};

export function taskReducer(
  state: ITaskState = initialState,
  action: TaskActionAllTypes
): ITaskState {
  let newTasks: ITask[] = [];
  let index = -1;
  switch (action.type) {
    case TaskActionTypes.CREATE_TASK:
      return {
        ...state,
        taskLoadState: LoadState.Loading,
      };
    case TaskActionTypes.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasksMap: {
          ...state.tasksMap,
          [action.payload.taskListId]: [
            action.payload,
            ...state.tasksMap[action.payload.taskListId],
          ],
        },
        taskLoadState: LoadState.LoadSuccessful,
      };
    case TaskActionTypes.CREATE_TASK_FAILURE:
      return {
        ...state,
        taskLoadState: LoadState.LoadFailed,
      };

    case TaskActionTypes.UPDATE_TASK:
      return {
        ...state,
        taskLoadState: LoadState.Loading,
      };
    case TaskActionTypes.UPDATE_TASK_SUCCESS:
      index = state.tasksMap[action.payload.taskListId].findIndex(
        (task) => task.id === action.payload.id
      );

      if (index >= 0) {
        newTasks = [
          ...state.tasksMap[action.payload.taskListId].slice(0, index),
          action.payload,
          ...state.tasksMap[action.payload.taskListId].slice(index + 1),
        ];
      } else {
        newTasks = [
          action.payload,
          ...state.tasksMap[action.payload.taskListId],
        ];
      }

      return {
        ...state,
        tasksMap: { ...state.tasksMap, [action.payload.taskListId]: newTasks },
        taskLoadState: LoadState.LoadSuccessful,
      };
    case TaskActionTypes.UPDATE_TASK_FAILURE:
      return {
        ...state,
        taskLoadState: LoadState.LoadFailed,
      };

    case TaskActionTypes.DELETE_TASK:
      return {
        ...state,
        taskLoadState: LoadState.Loading,
      };
    case TaskActionTypes.DELETE_TASK_SUCCESS:
      newTasks = state.tasksMap[action.payload.taskListId].filter(
        (task) => task.id !== action.payload.taskId
      );
      return {
        ...state,
        tasksMap: { ...state.tasksMap, [action.payload.taskListId]: newTasks },
        taskLoadState: LoadState.LoadSuccessful,
      };
    case TaskActionTypes.DELETE_TASK_FAILURE:
      return {
        ...state,
        taskLoadState: LoadState.LoadFailed,
      };

    case TaskActionTypes.GET_TASKS:
      return {
        ...state,
        taskLoadState: LoadState.Loading,
      };
    case TaskActionTypes.GET_TASKS_SUCCESS:
      newTasks = action.payload.tasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return {
        ...state,
        tasksMap: { ...state.tasksMap, [action.payload.taskListId]: newTasks },
        taskLoadState: LoadState.LoadSuccessful,
      };
    case TaskActionTypes.GET_TASKS_FAILURE:
      return {
        ...state,
        taskLoadState: LoadState.LoadFailed,
      };

    case TaskActionTypes.GET_TASK:
      return {
        ...state,
        taskLoadState: LoadState.Loading,
      };
    case TaskActionTypes.GET_TASK_SUCCESS:
      index = state.tasksMap[action.payload.taskListId].findIndex(
        (task) => task.id === action.payload.task.id
      );

      if (index >= 0) {
        newTasks = [
          ...state.tasksMap[action.payload.taskListId].slice(0, index),
          action.payload.task,
          ...state.tasksMap[action.payload.taskListId].slice(index + 1),
        ];
      } else {
        newTasks = [
          action.payload.task,
          ...state.tasksMap[action.payload.taskListId],
        ];
      }

      return {
        ...state,
        tasksMap: { ...state.tasksMap, [action.payload.taskListId]: newTasks },
        taskLoadState: LoadState.LoadSuccessful,
      };
    case TaskActionTypes.GET_TASK_FAILURE:
      return {
        ...state,
        taskLoadState: LoadState.LoadFailed,
      };

    default:
      return state;
  }
}

export type TaskReducerState = ReturnType<typeof taskReducer>;
