import { combineReducers } from "redux";
import { taskListReducer } from "./TaskLists.Reducer";
import { taskReducer } from "./Task.Reducers";

export const rootReducer = combineReducers({
  taskListsState: taskListReducer,
  tasksState: taskReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
