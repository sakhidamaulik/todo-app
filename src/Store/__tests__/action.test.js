import { TaskListActions } from "../TaskList.Actions";
import ITaskList from "../../Models/Tasks.Models";

describe("task list actions", () => {
  it("should create an action CreateTaskList", () => {
    const expectedAction = {
      type: "Create Tasklist",
      payload: ITaskList,
    };
    expect(TaskListActions.CreateTaskList()).toEqual(expectedAction);
  });
});
