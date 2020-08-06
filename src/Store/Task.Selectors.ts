import { ITask } from "./../Models/Tasks.Models";
import { createSelector } from "reselect";
import { LoadState } from "../Models/Tasks.Models";
import { RootReducerState } from "./RootReducer";
import { ITaskState } from "./Task.Reducers";

export class TasksSelectors {
  public static areTasksLoading = createSelector<
    RootReducerState,
    ITaskState,
    boolean
  >(
    (state) => state.tasksState,
    (state) =>
      state.taskLoadState === LoadState.Initial ||
      state.taskLoadState === LoadState.Loading
  );

  public static areTaskListsLoadFailed = createSelector<
    RootReducerState,
    ITaskState,
    boolean
  >(
    (state) => state.tasksState,
    (state) => state.taskLoadState === LoadState.LoadFailed
  );

  public static getTasks = createSelector<
    RootReducerState,
    ITaskState,
    (taskListId: string) => ITask[]
  >(
    (state) => state.tasksState,
    (state) =>
      state.tasksMap[taskListId].filter(
        (task) => task.taskListId === taskListId
      )
  );
}
