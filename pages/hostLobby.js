import React from 'react';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useState, useRef } from 'react';
import { SocketContext } from '../context/socketContext';
import { setName } from '../features/selfSlice';

function hostLobby() {
  // const inputRef = useRef(null);
  // const { socket } = useContext(SocketContext);
  // const { players } = useSelector((state) => state.board);
  // const { name, role } = useSelector((state) => state.self);
  // const dispatch = useDispatch();

  // function click() {
  //   socket.emit('board-state-update', {
  //     type: 'board/addPlayer',
  //     payload: { name: 'Jeff' },
  //   });
  // }

  // function sendName(e) {
  //   e.preventDefault();
  //   const name = inputRef.current.value;
  //   socket.emit('join', name);
  //   dispatch(setName(name));
  // }

  // function start() {
  //   socket.emit('start');
  // }

  // return (
  //   <div className={styles.container}>
  //     <button onClick={click}>Click Me!</button>
  //     {players.map((player, index) => (
  //       <div key={index}>{JSON.stringify(player)}</div>
  //     ))}
  //     <form onSubmit={sendName}>
  //       <p>Name:</p>
  //       <input name="input" type="text" ref={inputRef}></input>
  //       <button type="submit">Submit</button>
  //     </form>
  //     <button onClick={start}>Start</button>
  //     <div>name: {name}</div>
  //     <div>role: {role}</div>
  //   </div>
  // );

  const lobby = useSelector((state) => state.self.lobby);

  return (
    <div className="flex-col m-2">
      <div>Room name: {lobby}</div>
    </div>
  );
}

export default hostLobby;
