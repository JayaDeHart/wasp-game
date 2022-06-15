import { take, put, call, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import createSocketConnection from '../util/createConnection';

function nameSelector(state) {
  return state.self.name;
}

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const boardStateHandler = (event) => {
      emit({ type: 'board', event });
    };

    const rolesHandler = (event) => {
      emit({ type: 'setRoles', event });
    };

    const errorHandler = (errorEvent) => {
      emit(new Error(errorEvent.reason));
    };

    socket.on('server-state-update', boardStateHandler);
    socket.on('setRoles', rolesHandler);
    socket.on('error', errorHandler);

    const unsubscribe = () => {
      socket.off('server-state-update', boardStateHandler);
    };

    return unsubscribe;
  });
}

function* dispatchFromServer() {
  const socket = yield call(createSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const { type, event } = yield take(socketChannel);
      // yield put(action);
      switch (type) {
        case 'board':
          yield put(event);
          break;
        case 'setRoles':
          break;
        default:
        // code block
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default dispatchFromServer;
