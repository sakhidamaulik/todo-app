import React from "react";
import { ITask } from "../Models/Tasks.Models";

interface ITaskItemProps {
  task: ITask;
}

export const TaskItem: React.FunctionComponent<ITaskItemProps> = (
  props: ITaskItemProps
): JSX.Element => {
  const { task } = props;

  return <div>{task.title}</div>;
};

export default TaskItem;
