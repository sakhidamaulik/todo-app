import { ITask, LoadState } from "../Models/Tasks.Models";
import { TaskActionAllTypes, TaskActionTypes } from "./Task.Actions";

// export interface ITaskState {
// tasks: ITask[];
// taskLoadState: LoadState;
// }

// const initialState: ITaskState = {
// tasks: [],
// taskLoadState: LoadState.Initial,
// };

export function taskReducer(
state: ITaskListState = initialState,
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
newTasks = [action.payload, ...state.tasks];
return {
...state,
tasks: newTasks,
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
      index = state.tasks.findIndex((task) => task.id === action.payload.id);

      if (index >= 0) {
        newTasks = [
          ...state.tasks.slice(0, index),
          action.payload,
          ...state.tasks.slice(index + 1),
        ];
      } else {
        newTasks = [action.payload, ...state.tasks];
      }

      return {
        ...state,
        tasks: newTasks,
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
      newTasks = state.tasks.filter((task) => task.id !== action.payload);
      return {
        ...state,
        tasks: newTasks,
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
      newTasks = action.payload.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return {
        ...state,
        tasks: newTasks,
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
      index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index >= 0) {
        newTasks = state.tasks.splice(index, 1, action.payload);
      } else {
        newTasks = [...state.tasks, action.payload];
      }

      return {
        ...state,
        tasks: newTasks,
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
