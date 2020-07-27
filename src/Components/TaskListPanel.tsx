import React, {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";
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
import AddIcon from "@material-ui/icons/Add";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { TaskListsSelectors } from "../Store/TaskList.Selectors";
import { ITaskList } from "../Models/Tasks.Models";
import { TaskListActions } from "../Store/TaskList.Actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

interface ITaskListPanelProps {}

export const TaskListPanel: React.FunctionComponent = (
  props: ITaskListPanelProps
): JSX.Element => {
  // const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const [newTaskListTitle, setNewTaskListTitle] = useState("");
  const newTaskListRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();
  const taskLists = useSelector(TaskListsSelectors.getTaskLists);

  const onAdd = useCallback(() => {
    // const formRef = newTaskListRef.current;
    // const taskListName = formRef && formRef["newTask"].value;

    const taskListName = "react"; // newTaskListTitle;
    if (!taskListName) {
      console.error("taskListName is undefined");
      return;
    }

    const taskList: ITaskList = {
      id: uuid(),
      title: taskListName,
    };

    dispatch(TaskListActions.CreateTaskList(taskList));
  }, [dispatch]);

  const onDelete = useCallback(
    (taskListId: string) => {
      const action = TaskListActions.DeleteTaskList(taskListId);
      dispatch(action);
    },
    [dispatch]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <form ref={newTaskListRef}>
        <input
          type="text"
          placeholder="add task list"
          name="newTask"
          value={newTaskListTitle}
          onChange={(e) => setNewTaskListTitle(e.target.value)}
        />
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={onAdd}
        >
          <AddIcon />
        </IconButton>
      </form>
      <Divider />
      <List>
        {taskLists.map((taskList, index) => (
          <ListItem button key={index}>
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

  const container = undefined;
  // window !== undefined ? () => window().document.body : undefined;

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
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
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
};
