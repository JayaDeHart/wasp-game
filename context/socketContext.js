import React, { useState, useEffect } from 'react';
import createSocketConnection from '../util/createConnection';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayers } from '../features/boardSlice';
export const SocketContext = React.createContext();

function Socket(props) {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const lobby = useSelector((state) => state.self.lobby);

  useEffect(() => {
    const getSocket = createSocketConnection(lobby);
    setSocket(getSocket);
  }, [lobby]);

  useEffect(() => {
    if (socket) {
      socket.on('server-state-update', (payload) => {
        dispatch(payload);
      });
      socket.on('players', (payload) => {
        dispatch(setPlayers(payload));
      });
    }
  });

  const state = {
    socket,
  };

  return (
    <SocketContext.Provider value={state}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default Socket;
