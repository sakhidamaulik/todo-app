import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { taskListReducer } from "./Store/TaskLists.Reducer";
import rootSaga from "./Store/RootSaga";

import "./App.css";
import TaskListPanel from "./Components/TaskListPanel";
import { rootReducer } from "./Store/RootReducer";

export const App = () => {
  const sagaMiddleware = createSagaMiddleware();

  
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <TaskListPanel />
    </Provider>
  );
};

export default App;
