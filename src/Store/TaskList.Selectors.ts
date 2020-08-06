import { ITaskListState } from "./TaskLists.Reducer";
import { createSelector } from "reselect";
import { LoadState, ITaskList } from "../Models/Tasks.Models";
import { RootReducerState } from "./RootReducer";

export class TaskListsSelectors {
  public static areTaskListsLoading = createSelector<
    RootReducerState,
    ITaskListState,
    boolean
  >(
    (state) => state.taskListsState,
    (state) =>
      state.taskListLoadState === LoadState.Initial ||
      state.taskListLoadState === LoadState.Loading
  );

  public static areTaskListsLoadFailed = createSelector<
    RootReducerState,
    ITaskListState,
    boolean
  >(
    (state) => state.taskListsState,
    (state) => state.taskListLoadState === LoadState.LoadFailed
  );

  public static getTaskLists = createSelector<
    RootReducerState,
    ITaskListState,
    ITaskList[]
  >(
    (state) => state.taskListsState,
    (state) => state.taskLists
  );
}
