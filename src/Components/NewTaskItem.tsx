import React, { useState } from "react";
import { TextField, IconButton, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
    },
    addTaskTextField: {
      flex: "1 1 200px",
    },
    addTaskButton: {
      flex: "0 0 48px",
    },
  })
);

interface INewTaskItemProps {
  onAddTask: (title: string) => void;
}

export const NewTaskItem: React.FunctionComponent<INewTaskItemProps> = (
  props: INewTaskItemProps
): JSX.Element => {
  const classes = useStyles();
  const { onAddTask } = props;
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <>
      <div className={classes.root}>
        <TextField
          className={classes.addTaskTextField}
          label="Add Task"
          value={newTaskTitle}
          onChange={(e) => {
            setNewTaskTitle(e.target.value);
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <IconButton
          className={classes.addTaskButton}
          color="primary"
          aria-label="add task"
          onClick={() => onAddTask(newTaskTitle)}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Divider />
    </>
  );
};
export default NewTaskItem;
