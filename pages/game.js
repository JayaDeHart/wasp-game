import React from 'react';
import { useSelector } from 'react-redux';

function Game() {
  const role = useSelector((state) => state.self.role);

  return <div>{role}</div>;
}

export default Game;
