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
  console.log(socket);
  socket.emit('board-state-update', action);
}

//spy1
function* sendActionsToServer(socket) {
  const requestChan = yield actionChannel('*');
  while (true) {
    const action = yield take(requestChan);
    yield call(distributer, action, socket);
  }
}

//spy2
function* dispatchFromServer(socket) {
  try {
    console.log('dispatch from server');
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
    yield call(dispatchFromServer, socket);

    //something about the calling vs forking vs order can be used to figure this shit out
  } catch (e) {
    console.log(e);
  }
}
