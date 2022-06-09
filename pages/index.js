import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../features/boardSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.board);

  function click() {
    dispatch(addPlayer({ name: 'Jeff' }));
  }

  return (
    <div className={styles.container}>
      <button onClick={click}>Click Me!</button>
      {players.map((player) => (
        <div>{JSON.stringify(player)}</div>
      ))}
    </div>
  );
}
