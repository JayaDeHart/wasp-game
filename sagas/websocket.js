import { take, put, call, apply, delay, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import createSocketConnection from '../util/createConnection';

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const pingHandler = (event) => {
      emit(event);
    };

    const errorHandler = (errorEvent) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on('server-state-update', pingHandler);
    socket.on('error', errorHandler);

    const unsubscribe = () => {
      socket.off('ping', pingHandler);
    };

    return unsubscribe;
  });
}

function* distributer(action, socket) {
  if ('repeat' in action.payload) {
    const type = action.type;
    const data = action.payload.data;
    action = { type, payload: data };
  }
  if (!('repeat' in action.payload)) {
    socket.emit('board-state-update', action);
  }
}

function* sendActionsToServer(socket) {
  yield takeEvery('*', distributer);
}

function* dispatchFromServer() {
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);
  yield call(sendActionsToServer, socket);

  while (true) {
    try {
      const action = yield take(socketChannel);
      const payload = {
        data: action.payload,
        repeat: true,
      };
      yield put({ type: action.type, payload });
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default dispatchFromServer;
