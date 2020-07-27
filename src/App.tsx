import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { taskListReducer } from "./Store/TaskLists.Reducer";
import { WatchShipmentsSagas } from "./Store/TaskList.Sagas";

import "./App.css";
import { TaskListPanel } from "./Components/TaskListPanel";
import ResponsiveDrawer from "./Components/ResponsiveDrawer";
export const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(taskListReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(WatchShipmentsSagas);

  return (
    <Provider store={store}>
      <ResponsiveDrawer />
    </Provider>
  );
};

export default App;
