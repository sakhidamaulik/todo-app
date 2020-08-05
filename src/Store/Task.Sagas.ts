import {
  ICreateOrUpdateTaskParams,
  IDeleteTaskParams,
  IGetTaskParams,
} from "./../Models/Tasks.Models";
import { Action, TaskActions, TaskActionTypes } from "./Task.Actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { tasksService } from "../Services/Tasks.Service";

function* CreateTask(
  action: Action<TaskActionTypes.CREATE_TASK, ICreateOrUpdateTaskParams>
) {
  try {
    const taskResult = yield call(tasksService.createTask, action.payload);
    yield put(TaskActions.CreateTaskSuccess(taskResult));
  } catch (e) {
    yield put(TaskActions.CreateTaskFailure(e));
  }
}

function* UpdateTask(
  action: Action<TaskActionTypes.UPDATE_TASK, ICreateOrUpdateTaskParams>
) {
  try {
    const taskResult = yield call(tasksService.updateTask, action.payload);
    yield put(TaskActions.UpdateTaskSuccess(taskResult));
  } catch (e) {
    yield put(TaskActions.UpdateTaskFailure(e));
  }
}

function* DeleteTask(
  action: Action<TaskActionTypes.DELETE_TASK, IDeleteTaskParams>
) {
  try {
    yield call(tasksService.deleteTask, action.payload);
    yield put(TaskActions.DeleteTaskSuccess(action.payload));
  } catch (e) {
    yield put(TaskActions.DeleteTaskFailure(e));
  }
}

function* GetTasks(action: Action<TaskActionTypes.GET_TASKS, string>) {
  try {
    const tasks = yield call(tasksService.getTasks, action.payload);
    yield put(TaskActions.GetTasksSuccess(tasks));
  } catch (e) {
    yield put(TaskActions.GetTasksFailure(e));
  }
}

function* GetTask(action: Action<TaskActionTypes.GET_TASK, IGetTaskParams>) {
  try {
    const task = yield call(tasksService.getTask, action.payload);
    yield put(TaskActions.GetTaskSuccess(task));
  } catch (e) {
    yield put(TaskActions.GetTaskFailure(e));
  }
}

export function* WatchTasksSagas(): SagaIterator {
  yield takeLatest(TaskActionTypes.CREATE_TASK, CreateTask);
  yield takeLatest(TaskActionTypes.UPDATE_TASK, UpdateTask);
  yield takeLatest(TaskActionTypes.DELETE_TASK, DeleteTask);
  yield takeLatest(TaskActionTypes.GET_TASKS, GetTasks);
  yield takeLatest(TaskActionTypes.GET_TASK, GetTask);
}
