import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  TaskListActionTypes,
  Action,
  TaskListActions,
} from "./TaskList.Actions";
import { ITaskList } from "./../Models/Tasks.Models";
import { taskListService } from "../Services/TaskList.Service";

function* CreateTaskList(
  action: Action<TaskListActionTypes.CREATE_TASKLIST, ITaskList>
) {
  try {
    const taskListResult = yield call(
      taskListService.createTaskList,
      action.payload
    );
    yield put(TaskListActions.CreateTaskListSuccess(taskListResult));
  } catch (e) {
    yield put(TaskListActions.CreateTaskListFailure(e));
  }
}

function* UpdateTaskList(
  action: Action<TaskListActionTypes.CREATE_TASKLIST, ITaskList>
) {
  try {
    const taskListResult = yield call(
      taskListService.updateTaskList,
      action.payload
    );
    yield put(TaskListActions.UpdateTaskListSuccess(taskListResult));
  } catch (e) {
    yield put(TaskListActions.UpdateTaskListFailure(e));
  }
}

function* DeleteTaskList(
  action: Action<TaskListActionTypes.DELETE_TASKLIST, string>
) {
  try {
    yield call(taskListService.deleteTaskList, action.payload);
    yield put(TaskListActions.DeleteTaskListSuccess(action.payload));
  } catch (e) {
    yield put(TaskListActions.DeleteTaskListFailure(e));
  }
}

function* GetTaskLists(action: Action<TaskListActionTypes.GET_TASKLISTS, {}>) {
  try {
    const taskLists = yield call(taskListService.getTaskLists);
    yield put(TaskListActions.GetTaskListsSuccess(taskLists));
  } catch (e) {
    yield put(TaskListActions.GetTaskListsFailure(e));
  }
}

function* GetTaskList(
  action: Action<TaskListActionTypes.GET_TASKLIST, string>
) {
  try {
    const taskList = yield call(taskListService.getTaskList, action.payload);
    yield put(TaskListActions.GetTaskListSuccess(taskList));
  } catch (e) {
    yield put(TaskListActions.GetTaskListFailure(e));
  }
}

export function* WatchShipmentsSagas(): SagaIterator {
  yield takeLatest(TaskListActionTypes.CREATE_TASKLIST, CreateTaskList);
  yield takeLatest(TaskListActionTypes.UPDATE_TASKLIST, UpdateTaskList);
  yield takeLatest(TaskListActionTypes.DELETE_TASKLIST, DeleteTaskList);
  yield takeLatest(TaskListActionTypes.GET_TASKLISTS, GetTaskLists);
  yield takeLatest(TaskListActionTypes.GET_TASKLIST, GetTaskList);
}
