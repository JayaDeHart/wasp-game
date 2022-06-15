import {
  take,
  put,
  call,
  apply,
  delay,
  takeEvery,
  actionChannel,
  fork,
} from 'redux-saga/effects';
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
      socket.off('server-state-update', pingHandler);
    };

    return unsubscribe;
  });
}

function* distributer(action, socket) {
  socket.emit('board-state-update', action);
}

//spy1
function* sendActionsToServer(socket) {
  while (true) {
    const action = yield take('*');
    console.log(action);
    yield fork(distributer, action, socket);
  }
}

//spy2
function* dispatchFromServer(socket) {
  try {
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
      try {
        const { type, payload } = yield take(socketChannel);
        yield put({ type, payload });
      } catch (err) {
        console.error('socket error:', err);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  try {
    const socket = yield call(createSocketConnection);
    yield fork(sendActionsToServer, socket);
    yield fork(dispatchFromServer, socket);
  } catch (e) {
    console.log(e);
  }
}
