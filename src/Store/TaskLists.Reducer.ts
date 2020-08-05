import { ITaskList, LoadState } from "./../Models/Tasks.Models";
import {
  TaskListActionsAllTypes,
  TaskListActionTypes,
} from "./TaskList.Actions";
import { TaskActionTypes, TaskActionAllTypes } from "./Task.Actions";

export interface ITaskListState {
  taskLists: ITaskList[];
  taskListLoadState: LoadState;
  taskLoadState: LoadState;
}

const initialState: ITaskListState = {
  taskLists: [],
  taskListLoadState: LoadState.Initial,
  taskLoadState: LoadState.Initial,
};

export function taskListReducer(
  state: ITaskListState = initialState,
  action: TaskListActionsAllTypes | TaskActionAllTypes
): ITaskListState {
  let newTaskLists: ITaskList[] = [];
  let index = -1;
  let taskListIndex = -1;
  let tempTaskList: ITaskList;
  let newTaskList: ITaskList;

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

    case TaskActionTypes.CREATE_TASK:
      return {
        ...state,
        taskLoadState: LoadState.Loading,
      };

    case TaskActionTypes.CREATE_TASK_SUCCESS:
      taskListIndex = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload.taskListId
      );

      tempTaskList = state.taskLists[taskListIndex];

      newTaskList = {
        id: tempTaskList.id,
        title: tempTaskList.title,
        createdAt: tempTaskList.createdAt,
        tasks: [action.payload, ...tempTaskList.tasks],
      };

      return {
        ...state,
        taskLists: [
          ...state.taskLists.slice(0, taskListIndex),
          newTaskList,
          ...state.taskLists.slice(taskListIndex + 1),
        ],
        taskLoadState: LoadState.LoadSuccessful,
      };

    case TaskActionTypes.CREATE_TASK_FAILURE:
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
      taskListIndex = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload.taskListId
      );

      tempTaskList = state.taskLists[taskListIndex];

      newTaskList = {
        id: tempTaskList.id,
        title: tempTaskList.title,
        createdAt: tempTaskList.createdAt,
        tasks: tempTaskList.tasks.filter(
          (task) => task.id !== action.payload.taskId
        ),
      };

      return {
        ...state,
        taskLists: [
          ...state.taskLists.slice(0, taskListIndex),
          newTaskList,
          ...state.taskLists.slice(taskListIndex + 1),
        ],
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
      if (!action.payload || action.payload.length === 0) {
        return {
          ...state,
          taskLoadState: LoadState.LoadSuccessful,
        };
      }

      const newTasks = action.payload.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      taskListIndex = state.taskLists.findIndex(
        (taskList) => taskList.id === action.payload[0].taskListId
      );

      tempTaskList = state.taskLists[taskListIndex];

      newTaskList = {
        id: tempTaskList.id,
        title: tempTaskList.title,
        createdAt: tempTaskList.createdAt,
        tasks: newTasks,
      };

      return {
        ...state,
        taskLists: [
          ...state.taskLists.slice(0, taskListIndex),
          newTaskList,
          ...state.taskLists.slice(taskListIndex + 1),
        ],
        taskLoadState: LoadState.LoadSuccessful,
      };

    case TaskActionTypes.GET_TASKS_FAILURE:
      return {
        ...state,
        taskLoadState: LoadState.LoadFailed,
      };

    default:
      return state;
  }
}

export type TaskListReducerState = ReturnType<typeof taskListReducer>;
