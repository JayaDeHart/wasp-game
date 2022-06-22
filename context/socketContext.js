import React, { useState, useEffect } from 'react';
import createSocketConnection from '../util/createConnection';
export const SocketContext = React.createContext();
import { useSelector } from '@reduxjs/toolkit';

function Socket(props) {
  const [socket, setSocket] = useState(null);
  const lobby = useSelector((state) => state.self.lobby);

  useEffect(() => {
    const getSocket = createSocketConnection(lobby);
    setSocket(getSocket);
  }, []);

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
