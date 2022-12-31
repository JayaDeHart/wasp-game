import React, { useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLobby, setName } from '../features/selfSlice';
import Players from '../components/Players';
import { SocketContext } from '../context/socketContext';

function PlayerLobby() {
  const { socket } = useContext(SocketContext);
  const roomRef = useRef(null);
  const nameRef = useRef(null);
  const dispatch = useDispatch();

  function joinRoom() {
    const room = roomRef.current.value;
    dispatch(setLobby(`namespace-${room}`));
  }

  function sendName() {
    const name = nameRef.current.value;
    socket.emit('join', name);
    dispatch(setName(name));
  }

  return (
    <div>
      <div>
        <p>room name:</p>
        <input ref={roomRef} />
        <button onClick={joinRoom}>Join</button>
      </div>
      <div>
        <p>your name:</p>
        <input ref={nameRef} />
        <button onClick={sendName}>Join</button>
      </div>
      <div>Players in lobby:</div>
      <Players />
    </div>
  );
}

export default PlayerLobby;
