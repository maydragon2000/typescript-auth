import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
// import { routerMiddleware } from "connected-react-router";

import thunk from "redux-thunk";
import buildRootReducer from "./reducers/index";

export default function configureStore(history: any, initialState = {}) {
  const middlewares = [thunk]
  return createStore(
    buildRootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}
