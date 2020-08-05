import React, { useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

interface INewTaskItemProps {
  onAddTask: (title: string) => void;
}

export const NewTaskItem: React.FunctionComponent<INewTaskItemProps> = (
  props: INewTaskItemProps
): JSX.Element => {
  const { onAddTask } = props;
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <div>
      <TextField
        label="Add Task"
        value={newTaskTitle}
        onChange={(e) => {
          setNewTaskTitle(e.target.value);
        }}
      />
      <IconButton
        color="primary"
        aria-label="add task"
        onClick={() => onAddTask(newTaskTitle)}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};
export default NewTaskItem;
