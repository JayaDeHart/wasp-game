import React, { useState, useEffect } from 'react';
import createSocketConnection from '../util/createConnection';
export const SocketContext = React.createContext();

function Socket(props) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const getSocket = createSocketConnection();
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
