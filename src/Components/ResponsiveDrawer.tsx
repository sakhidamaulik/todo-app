import React, { useEffect, useCallback, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuid } from "uuid";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import { TaskListsSelectors } from "../Store/TaskList.Selectors";
import { TaskListActions } from "../Store/TaskList.Actions";
import { TextField } from "@material-ui/core";
import { ITaskList } from "../Models/Tasks.Models";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {}

export default function ResponsiveDrawer(props: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [newTaskListTitle, setNewTaskListTitle] = useState("");
  const dispatch = useDispatch();
  const taskLists = useSelector(TaskListsSelectors.getTaskLists);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onAdd = useCallback(() => {
    const taskListName = newTaskListTitle;
    if (!taskListName) {
      console.error("taskListName is undefined");
      return;
    }
    const taskList: ITaskList = {
      id: uuid(),
      title: taskListName,
      createdAt: new Date().toString(),
    };

    dispatch(TaskListActions.CreateTaskList(taskList));
  }, [dispatch, newTaskListTitle]);

  const onDelete1 = useCallback(
    (event, data: HTMLDivElement) => {
      if (Array.isArray(data)) {
        data.map((row) => {
          console.log("You want to delete " + row.id);
          return 0;
        });
      } else {
        console.log("You want to delete " + data.id);
        const action = TaskListActions.DeleteTaskList(data.id);
        dispatch(action);
      }
    },
    [dispatch]
  );

  const onDelete = useCallback(
    (taskListId: string) => {
      const action = TaskListActions.DeleteTaskList(taskListId);
      dispatch(action);
    },
    [dispatch]
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <TextField
        label="Add task list"
        value={newTaskListTitle}
        onChange={(e) => {
          setNewTaskListTitle(e.target.value);
        }}
      />
      <IconButton color="primary" aria-label="add to task list" onClick={onAdd}>
        <AddIcon />
      </IconButton>
      <Divider />
      <List>
        {taskLists.map((taskList, index) => (
          <ListItem button key={index} onClick={() => onDelete(taskList.id)}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary={taskList.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  useEffect(() => {
    dispatch(TaskListActions.GetTaskLists());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
      </main>
    </div>
  );
}
