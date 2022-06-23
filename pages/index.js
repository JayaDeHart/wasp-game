import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setHost, setLobby } from '../features/selfSlice';
import { SocketContext } from '../context/socketContext';
import { useContext } from 'react';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  function handleCreate() {
    const code = (Math.random().toString(36) + '00000000000000000').slice(2, 8);
    const lobby = `namespace-${code}`;
    dispatch(setHost(true));
    dispatch(setLobby(lobby));
    router.push('/hostLobby');
  }

  function handleJoin() {
    dispatch(setHost(false));
    router.push('/playerLobby');
  }

  return (
    <div className="flex">
      <button className="border-2" onClick={handleCreate}>
        Create a lobby
      </button>
      <button className="border-2" onClick={handleJoin}>
        Join a lobby
      </button>
    </div>
  );
}
