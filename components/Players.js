import React from 'react';
import { useSelector } from '@reduxjs/toolkit';

function Players() {
  const players = useSelector((state) => state.board.players);

  return (
    <div className="flex-col">
      {players.map((player) => (
        <p>{player.name}</p>
      ))}
    </div>
  );
}

export default Players;
