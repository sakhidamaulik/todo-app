import React, { useCallback, useSelector } from "react";
import { ITask, ICreateOrUpdateTaskParams } from "../Models/Tasks.Models";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { TaskActions } from "../Store/Task.Actions";
import NewTaskItem from "./NewTaskItem";
import TaskItem from "./TaskItem";
import { TasksSelectors } from "../Store/Task.Selectors";

interface ITasksPanelProps {
  taskListId: string;
}

export const TasksPanel: React.FunctionComponent<ITasksPanelProps> = (
  props: ITasksPanelProps
): JSX.Element => {
  const dispatch = useDispatch();
  const { taskListId } = props;
  const tasks = useSelector(TasksSelectors.getTasks)(taskListId);
  
  const onAddTask = useCallback(
    (title: string) => {
      const newTask: ITask = {
        id: uuid(),
        title,
        createdAt: new Date().toString(),
        taskListId,
      };
      const params: ICreateOrUpdateTaskParams = {
        taskListId,
        task: newTask,
      };
      dispatch(TaskActions.CreateTask(params));
    },

    [dispatch, taskListId]
  );
  return (
    <div>
      <NewTaskItem onAddTask={onAddTask} />
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </div>
  );
};

export default TasksPanel;
