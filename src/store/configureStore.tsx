import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
// import { routerMiddleware } from "connected-react-router";

import thunk from "redux-thunk";
import buildRootReducer from "./reducers/index";

export default function configureStore(history: any, initialState = {}) {
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // const middlewares = [routerMiddleware(history), thunk];

  // if (process.env.NODE_ENV !== "production") {
  //   const logger = createLogger({ collapsed: true, diff: true });
  //   middlewares.push(logger);
  // }
  const middlewares = [thunk]
  return createStore(
    buildRootReducer(history),
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}
