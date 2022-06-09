import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/boardSlice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas/poot';

const saga = createSagaMiddleware();

export default configureStore({
  reducer: {
    board: boardReducer,
  },
  middleware: [saga],
});
saga.run(rootSaga);
