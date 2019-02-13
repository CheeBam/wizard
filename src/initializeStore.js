import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// import DBMiddleware from './middleware/dbMiddleware';
import rootReducer from './reducers';

import rootSaga from "./sagas";
// import listMiddleware from "./middleware/user/listMiddleware";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const init = () => {
  const initialState = {

  };

  try {

    return initialState;
  } catch (error) {
    // eslint-disable-next-line
    console.error('startup', error);
    return initialState;
  }
};

export default function initializeStore() {

  const preloadedState = init();

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware)
      // applyMiddleware(sagaMiddleware, DBMiddleware())
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
