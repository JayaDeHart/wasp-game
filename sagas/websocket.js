import { take, put, call, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import createSocketConnection from '../util/createConnection';

function nameSelector(state) {
  return state.self.name;
}

function nameSpaceSelector(state) {
  return state.self.lobby;
}

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const boardStateHandler = (event) => {
      emit({ type: 'board', event });
    };

    const rolesHandler = (event) => {
      console.log(event);
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
      socket.off('setRoles', rolesHandler);
    };

    return unsubscribe;
  });
}

function* dispatchFromServer() {
  const lobby = yield select(nameSpaceSelector);
  const socket = yield call(createSocketConnection, lobby);
  console.log(socket);
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
          const myName = yield select(nameSelector);
          for (let x = 0; x < event.length; x++) {
            if (myName === event[x].name) {
              yield put({ type: 'self/setRole', payload: event[x].role });
            }
          }
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
