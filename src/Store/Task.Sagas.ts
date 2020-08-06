import {
  IDeleteTaskParams,
  IGetTaskParams,
  ITask,
  IDeleteTaskResult,
  IGetTasksResult,
  IGetTaskResult,
} from "./../Models/Tasks.Models";
import { Action, TaskActions, TaskActionTypes } from "./Task.Actions";
import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { tasksService } from "../Services/Tasks.Service";

function* CreateTask(action: Action<TaskActionTypes.CREATE_TASK, ITask>) {
  try {
    const createdTask: ITask = yield call(
      tasksService.createTask,
      action.payload
    );
    yield put(TaskActions.CreateTaskSuccess(createdTask));
  } catch (e) {
    yield put(TaskActions.CreateTaskFailure(e));
  }
}

function* UpdateTask(action: Action<TaskActionTypes.UPDATE_TASK, ITask>) {
  try {
    const updatedTask = yield call(tasksService.updateTask, action.payload);
    yield put(TaskActions.UpdateTaskSuccess(updatedTask));
  } catch (e) {
    yield put(TaskActions.UpdateTaskFailure(e));
  }
}

function* DeleteTask(
  action: Action<TaskActionTypes.DELETE_TASK, IDeleteTaskParams>
) {
  try {
    yield call(tasksService.deleteTask, action.payload.taskId);
    const result: IDeleteTaskResult = {
      taskListId: action.payload.taskListId,
      taskId: action.payload.taskId,
    };
    yield put(TaskActions.DeleteTaskSuccess(result));
  } catch (e) {
    yield put(TaskActions.DeleteTaskFailure(e));
  }
}

function* GetTasks(action: Action<TaskActionTypes.GET_TASKS, string>) {
  try {
    const tasks: ITask[] = yield call(tasksService.getTasks, action.payload);
    const result: IGetTasksResult = {
      taskListId: action.payload,
      tasks,
    };
    yield put(TaskActions.GetTasksSuccess(result));
  } catch (e) {
    yield put(TaskActions.GetTasksFailure(e));
  }
}

function* GetTask(action: Action<TaskActionTypes.GET_TASK, IGetTaskParams>) {
  try {
    const task: ITask = yield call(tasksService.getTask, action.payload.taskId);
    const result: IGetTaskResult = {
      taskListId: action.payload.taskListId,
      task,
    };

    yield put(TaskActions.GetTaskSuccess(result));
  } catch (e) {
    yield put(TaskActions.GetTaskFailure(e));
  }
}

export function* WatchTasksSagas(): SagaIterator {
  yield takeEvery(TaskActionTypes.CREATE_TASK, CreateTask);
  yield takeEvery(TaskActionTypes.UPDATE_TASK, UpdateTask);
  yield takeEvery(TaskActionTypes.DELETE_TASK, DeleteTask);
  yield takeLatest(TaskActionTypes.GET_TASKS, GetTasks);
  yield takeLatest(TaskActionTypes.GET_TASK, GetTask);
}
