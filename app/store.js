import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/boardSlice';
import selfReducer from '../features/selfSlice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas/websocket';

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
    board: boardReducer,
    self: selfReducer,
  },
  middleware: [saga],
});
// saga.run(rootSaga);
