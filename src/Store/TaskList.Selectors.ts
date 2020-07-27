import { TaskListReducerState, ITaskListState } from "./TaskLists.Reducer";
import { createSelector } from "reselect";
import { LoadState, ITaskList } from "../Models/Tasks.Models";

export class TaskListsSelectors {
  public static areTaskListsLoading = createSelector<
    TaskListReducerState,
    ITaskListState,
    boolean
  >(
    (state) => state,
    (state) =>
      state.taskListLoadState === LoadState.Initial ||
      state.taskListLoadState === LoadState.Loading
  );

  public static areTaskListsLoadFailed = createSelector<
    TaskListReducerState,
    ITaskListState,
    boolean
  >(
    (state) => state,
    (state) => state.taskListLoadState === LoadState.LoadFailed
  );

  public static getTaskLists = createSelector<
    TaskListReducerState,
    ITaskListState,
    ITaskList[]
  >(
    (state) => state,
    (state) => state.taskLists
  );
}
