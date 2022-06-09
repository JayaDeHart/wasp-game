import { takeEvery, call, apply } from 'redux-saga/effects';
import createSocketConnection from '../util/createConnection';

function* distributer(action) {
  if ('repeat' in action.payload) {
    const type = action.type;
    const data = action.payload.data;
    action = { type, payload: data };
  }
  if (!('repeat' in action.payload)) {
    const socket = yield call(createSocketConnection);
    socket.emit('board-state-update', action);
  }
}

function* sendActionsToServer() {
  yield takeEvery('*', distributer);
  //we can modify the above takeEvery to change which actions automatically get passed to distributer. Once an action hits distributer, it should automatically be dispatched to every client
}

export default sendActionsToServer;
