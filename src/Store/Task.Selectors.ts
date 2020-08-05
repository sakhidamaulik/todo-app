import { ITaskState } from "./Task.Reducers";
import { ITask } from "./../Models/Tasks.Models";
import { createSelector } from "reselect";
import { LoadState } from "../Models/Tasks.Models";
import { ITaskListState, TaskListReducerState } from "./TaskLists.Reducer";
import { TaskReducerState } from "./Task.Reducers";

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

  public static getTasks = createSelector<
    TaskReducerState,
    ITask[],
    (taskListId: string) => ITask[]
  >(
    (state) => state.tasks,
    (tasks) => tasks.filter((task) => task.taskListId === taskListId)
  );
}
