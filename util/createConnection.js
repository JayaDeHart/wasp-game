import io from 'socket.io-client';

export default function createSocketConnection() {
  return io('http://localhost:8000');
}
