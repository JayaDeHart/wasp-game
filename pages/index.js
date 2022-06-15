import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useState, useRef } from 'react';
import { SocketContext } from '../context/socketContext';
import { setName } from '../features/selfSlice';

export default function Home() {
  const inputRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { players } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  function click() {
    socket.emit('board-state-update', {
      type: 'board/addPlayer',
      payload: { name: 'Jeff' },
    });
  }

  function setName(e) {
    e.preventDefault();
    const name = inputRef.current['input'].value;
    socket.emit('join', name);
    dispatch(setName(name));
  }

  function start() {
    socket.emit('start');
  }

  return (
    <div className={styles.container}>
      <button onClick={click}>Click Me!</button>
      {players.map((player, index) => (
        <div key={index}>{JSON.stringify(player)}</div>
      ))}
      <form ref={inputRef}>
        <p>Name:</p>
        <input name="input" type="text"></input>
        <button onClick={setName}>Submit</button>
      </form>
      <button onClick={start}>Start</button>
    </div>
  );
}
