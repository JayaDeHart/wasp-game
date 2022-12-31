import React from 'react';
import { useSelector } from 'react-redux';

function Players() {
  const players = useSelector((state) => state.board.players);

  return (
    <div className="flex-col">
      {players.map((player) => (
        <p key={player}>{player.name}</p>
      ))}
    </div>
  );
}

export default Players;
