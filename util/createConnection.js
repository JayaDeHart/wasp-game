import io from 'socket.io-client';

export default function createSocketConnection(namespace) {
  return io(`http://localhost:8000/namespace-${namespace}`);
}
