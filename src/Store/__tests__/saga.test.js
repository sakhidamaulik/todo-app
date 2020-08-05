import { takeLatest } from "redux-saga/effects";
import { CreateTaskList, WatchShipmentsSagas } from "../TaskList.Sagas";
import { TaskListActionTypes } from "../TaskList.Actions";

describe("CreateTaskList", () => {
  it("should dispatch an action CREATE_TASKLIST", () => {
    const generator = WatchShipmentsSagas();
    expect(generator.next().value)
      .toEqual
      takeLatest(TaskListActionTypes.CREATE_TASKLIST, CreateTaskList)
      ();
    expect(generator.next().done).toBeTruthy();
  });
});
