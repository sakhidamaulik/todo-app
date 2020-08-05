import { createSelector } from "reselect";
import { LoadState } from "../Models/Tasks.Models";
import { ITaskListState, TaskListReducerState } from "./TaskLists.Reducer";

export class TasksSelectors {
  public static areTasksLoading = createSelector<
    TaskListReducerState,
    ITaskListState,
    boolean
  >(
    (state) => state,
    (state) =>
      state.taskLoadState === LoadState.Initial ||
      state.taskLoadState === LoadState.Loading
  );

  public static areTaskListsLoadFailed = createSelector<
    TaskListReducerState,
    ITaskListState,
    boolean
  >(
    (state) => state,
    (state) => state.taskLoadState === LoadState.LoadFailed
  );
}
