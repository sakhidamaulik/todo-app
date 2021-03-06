import { ITaskList, LoadState } from "./../Models/Tasks.Models";
import {
  TaskListActionsAllTypes,
  TaskListActionTypes,
} from "./TaskList.Actions";

export interface ITaskListsState {
  taskLists: ITaskList[];
  taskListLoadState: LoadState;
  taskLoadState: LoadState;
}

const initialState: ITaskListsState = {
  taskLists: [],
  taskListLoadState: LoadState.Initial,
  taskLoadState: LoadState.Initial,
};

export function taskListReducer(
  state: ITaskListsState = initialState,
  action: TaskListActionsAllTypes
): ITaskListsState {
  let newTaskLists: ITaskList[] = [];
  let index = -1;

  switch (action.type) {
    case TaskListActionTypes.CREATE_TASKLIST:
      return {
        ...state,
        taskListLoadState: LoadState.Loading,
      };
    case TaskListActionTypes.CREATE_TASKLIST_SUCCESS:
      newTaskLists = [action.payload, ...state.taskLists];
      return {
        ...state,
        taskLists: newTaskLists,
        taskListLoadState: LoadState.LoadSuccessful,
      };
    case TaskListActionTypes.CREATE_TASKLIST_FAILURE:
      return {
        ...state,
        taskListLoadState: LoadState.LoadFailed,
      };

    case TaskListActionTypes.UPDATE_TASKLIST:
      return {
        ...state,
        taskListLoadState: LoadState.Loading,
      };
    case TaskListActionTypes.UPDATE_TASKLIST_SUCCESS:
      index = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload.id
      );

      if (index >= 0) {
        // state.taskLists.splice(index, 1, action.payload);
        newTaskLists = [
          ...state.taskLists.slice(0, index),
          action.payload,
          ...state.taskLists.slice(index + 1),
        ];
      } else {
        newTaskLists = [action.payload, ...state.taskLists];
      }

      return {
        ...state,
        taskLists: newTaskLists,
        taskListLoadState: LoadState.LoadSuccessful,
      };
    case TaskListActionTypes.UPDATE_TASKLIST_FAILURE:
      return {
        ...state,
        taskListLoadState: LoadState.LoadFailed,
      };

    case TaskListActionTypes.DELETE_TASKLIST:
      return {
        ...state,
        taskListLoadState: LoadState.Loading,
      };
    case TaskListActionTypes.DELETE_TASKLIST_SUCCESS:
      newTaskLists = state.taskLists.filter(
        (taskList) => taskList.id !== action.payload
      );
      return {
        ...state,
        taskLists: newTaskLists,
        taskListLoadState: LoadState.LoadSuccessful,
      };
    case TaskListActionTypes.DELETE_TASKLIST_FAILURE:
      return {
        ...state,
        taskListLoadState: LoadState.LoadFailed,
      };

    case TaskListActionTypes.GET_TASKLISTS:
      return {
        ...state,
        taskListLoadState: LoadState.Loading,
      };
    case TaskListActionTypes.GET_TASKLISTS_SUCCESS:
      newTaskLists = action.payload.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return {
        ...state,
        taskLists: newTaskLists,
        taskListLoadState: LoadState.LoadSuccessful,
      };
    case TaskListActionTypes.GET_TASKLISTS_FAILURE:
      return {
        ...state,
        taskListLoadState: LoadState.LoadFailed,
      };

    case TaskListActionTypes.GET_TASKLIST:
      return {
        ...state,
        taskListLoadState: LoadState.Loading,
      };
    case TaskListActionTypes.GET_TASKLIST_SUCCESS:
      index = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload.id
      );
      if (index >= 0) {
        newTaskLists = state.taskLists.splice(index, 1, action.payload);
      } else {
        newTaskLists = [...state.taskLists, action.payload];
      }

      return {
        ...state,
        taskLists: newTaskLists,
        taskListLoadState: LoadState.LoadSuccessful,
      };
    case TaskListActionTypes.GET_TASKLIST_FAILURE:
      return {
        ...state,
        taskListLoadState: LoadState.LoadFailed,
      };
    default:
      return state;
  }
}

export type TaskListReducerState = ReturnType<typeof taskListReducer>;
