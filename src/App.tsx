import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { taskListReducer } from "./Store/TaskLists.Reducer";
import rootSaga from "./Store/RootSaga";

import "./App.css";
// import { TaskListPanelOLD } from "./Components/TaskListPanelOLD";
import TaskListPanel from "./Components/TaskListPanel";

export const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(taskListReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <TaskListPanel />
    </Provider>
  );
};

export default App;
