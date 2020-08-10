import React, { useCallback, useState } from "react";
import { ITask, IDeleteTaskParams } from "../Models/Tasks.Models";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { TaskActions } from "../Store/Task.Actions";
import { useDispatch } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { v4 as uuid } from "uuid";
import { IconButton, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      height: "52px",
      padding: "8px 12px",
    },
    taskTitle: {
      fontSize: "14px",
      flex: "1 1 176px",
    },
    editTaskButton: {
      flex: "0 0 48px",
      color: "#3f51b5",
    },
    saveTaskButton: {
      flex: "0 0 48px",
      color: "#3f51b5",
    },
    deleteTaskButton: {
      flex: "0 0 48px",
      color: "red",
    },
  })
);

interface ITaskItemProps {
  task: ITask;
}

export const TaskItem: React.FunctionComponent<ITaskItemProps> = (
  props: ITaskItemProps
): JSX.Element => {
  const { task } = props;

  const [taskTitle, setNewTaskTitle] = useState(task.title);
  const [isTaskTitleEditable, setIsTaskTitleEditable] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const onUpdateTaskTitle = () => {
    setIsTaskTitleEditable(true);
  };

  const onSaveTaskTitle = useCallback(() => {
    const updatedTask: ITask = {
      id: props.task.id,
      title: taskTitle,
      taskListId: props.task.taskListId,
      createdAt: props.task.createdAt,
      //TODO: Need to add updatedAt property in ITask
    };
    dispatch(TaskActions.UpdateTask(updatedTask));
    setIsTaskTitleEditable(false);
  }, [
    dispatch,
    props.task.createdAt,
    props.task.id,
    props.task.taskListId,
    taskTitle,
  ]);

  const onDeleteTaskItem = useCallback(() => {
    const deleteTaskParams: IDeleteTaskParams = {
      taskListId: props.task.taskListId,
      taskId: props.task.id,
    };
    dispatch(TaskActions.DeleteTask(deleteTaskParams));
  }, [dispatch, props.task.id, props.task.taskListId]);

  return (
    <div className={classes.root}>
      <TextField
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSaveTaskTitle();
          }
        }}
        className={classes.taskTitle}
        value={taskTitle}
        inputProps={{
          readOnly: !isTaskTitleEditable,
          disabled: !isTaskTitleEditable,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        required={isTaskTitleEditable}
        onChange={(e) => {
          setNewTaskTitle(e.target.value);
        }}
        onBlur={onSaveTaskTitle}
      />

      {!isTaskTitleEditable ? (
        <IconButton aria-label="edit">
          <EditIcon
            className={classes.editTaskButton}
            onClick={onUpdateTaskTitle}
          />
        </IconButton>
      ) : (
        <IconButton aria-label="save">
          <SaveIcon
            className={classes.saveTaskButton}
            onClick={onSaveTaskTitle}
          />
        </IconButton>
      )}

      <IconButton aria-label="delete">
        <DeleteForeverIcon
          className={classes.deleteTaskButton}
          onClick={() => onDeleteTaskItem()}
        />
      </IconButton>
    </div>
  );
};

export default TaskItem;
