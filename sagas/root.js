import sendActionsToServer from './sendactions';
import dispatchFromServer from './websocket';
import { all, fork } from 'redux-saga/effects';

export default function* rootSaga() {
  // yield fork(sendActionsToServer);
  yield fork(dispatchFromServer);
}
