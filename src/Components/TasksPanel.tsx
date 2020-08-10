import React, { useCallback, useEffect } from "react";
import { ITask } from "../Models/Tasks.Models";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { TaskActions } from "../Store/Task.Actions";
import NewTaskItem from "./NewTaskItem";
import TaskItem from "./TaskItem";
import { TasksSelectors } from "../Store/Task.Selectors";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: 1,
    },
  })
);

interface ITasksPanelProps {
  taskListId: string;
}

export const TasksPanel: React.FunctionComponent<ITasksPanelProps> = (
  props: ITasksPanelProps
): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { taskListId } = props;
  const tasksMap: { [taskListId: string]: ITask[] } = useSelector(
    TasksSelectors.getTasksMap
  );

  const onAddTask = useCallback(
    (title: string) => {
      if (!title) {
        console.error("Task title should not be empty");
        return;
      }
      const newTask: ITask = {
        id: uuid(),
        title,
        createdAt: new Date().toString(),
        taskListId,
      };
      dispatch(TaskActions.CreateTask(newTask));
    },

    [dispatch, taskListId]
  );

  useEffect(() => {
    dispatch(TaskActions.GetTasks(taskListId));
  }, [dispatch, taskListId]);

  return (
    <div className={classes.root}>
      <NewTaskItem onAddTask={onAddTask} />
      {tasksMap &&
        tasksMap[taskListId] &&
        tasksMap[taskListId].map((task) => (
          <>
            <TaskItem key={task.id} task={task} />
            <Divider />
          </>
        ))}
    </div>
  );
};

export default TasksPanel;
