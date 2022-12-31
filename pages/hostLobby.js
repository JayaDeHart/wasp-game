import React from 'react';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useState, useRef } from 'react';
import { SocketContext } from '../context/socketContext';
import { setName } from '../features/selfSlice';
import { useRouter } from 'next/router';
import Players from '../components/Players';

function HostLobby() {
  const lobby = useSelector((state) => state.self.lobby);
  const myName = useSelector((state) => state.self.name);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const router = useRouter();

  function sendName(e) {
    e.preventDefault();
    const name = inputRef.current.value;
    socket.emit('join', name);
    dispatch(setName(name));
  }

  function start(e) {
    socket.emit('start');
  }

  return (
    <div className="flex-col m-2">
      <div>Room name: {lobby}</div>
      <form onSubmit={sendName}>
        <p>Name:</p>
        <input name="input" type="text" ref={inputRef}></input>
        <button type="submit" disabled={myName !== 'unset'}>
          Join
        </button>
      </form>
      <div>Name: {myName}</div>
      <div>
        <button onClick={start} disabled={myName == 'unset'}>
          Start the game!
        </button>
      </div>
      <div>Players in lobby</div>
      <Players />
    </div>
  );
}

export default HostLobby;
