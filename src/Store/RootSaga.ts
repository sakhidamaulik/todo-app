import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { WatchTaskListsSagas } from "./TaskList.Sagas";
import { WatchTasksSagas } from "./Task.Sagas";

export default function* rootSaga(): SagaIterator {
  yield all([fork(WatchTaskListsSagas), fork(WatchTasksSagas)]);
}
