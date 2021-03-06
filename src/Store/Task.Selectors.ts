import { ITask } from "./../Models/Tasks.Models";
import { createSelector } from "reselect";
import { LoadState } from "../Models/Tasks.Models";
import { RootReducerState } from "./RootReducer";
import { ITasksState } from "./Task.Reducers";

export class TasksSelectors {
  public static areTasksLoading = createSelector<
    RootReducerState,
    ITasksState,
    boolean
  >(
    (state) => state.tasksState,
    (state) =>
      state.taskLoadState === LoadState.Initial ||
      state.taskLoadState === LoadState.Loading
  );

  public static areTaskListsLoadFailed = createSelector<
    RootReducerState,
    ITasksState,
    boolean
  >(
    (state) => state.tasksState,
    (state) => state.taskLoadState === LoadState.LoadFailed
  );

  public static getTasksMap = createSelector<
    RootReducerState,
    ITasksState,
    { [taskListId: string]: ITask[] }
  >(
    (state) => state.tasksState,
    (state) => state.tasksMap
  );
}
