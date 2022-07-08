import React, { useCallback, useEffect, useState } from 'react';
import { extendHex, defineGrid } from 'honeycomb-grid';
import { v4 as uuidv4 } from 'uuid';
import { Stage, Container, Sprite, Graphics } from '@inlet/react-pixi';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard } from '../features/boardSlice';
import Hexagon from '../components/Hexagon';

let Hex = extendHex({
  size: 17,
  orientation: 'flat',
  color: '0xc2c0c0',
  setColor(color) {
    this.color = color;
    console.log(this);
  },
});

const Grid = defineGrid(Hex);

function testicles() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.board);

  useEffect(() => {
    const testGrid = Grid.hexagon({ radius: 12, center: [12, 12] });
    dispatch(setBoard(testGrid));
  }, []);

  function updateHex(hex, property, value) {
    const { x, y } = hex;
    const updatedHex = hex.set({ x, y, [property]: value });
    const clone = Grid(board);
    clone.set(hex, updatedHex);
    dispatch(setBoard(clone));

    // const updatedGrid = copy.set(hex, updatedHex);
    // //^ it doesn't like this because you're trying to change redux-state directly
    // //so the question is: how do we access all the useful methods like .set without pissing off redux?

    // //Shit is not updating because grid.set updates the grid 'in place'
    // //and react only checks reference equality to determine re-renders
    // //So, I need to set grid to an object? array? smth? that has the same exact values as updatedGrid but is pointing to a different variable / reference object
    // //but the spread operator isn't working because updatedGrid is some weird class thing that extends the array method but also has properties and such
    // //I could also try just going to redux, because I think redux handles object/reference equality differently.
    // dispatch(setBoard(updatedGrid));
  }

  return (
    <div className="flex justify-center align-middle">
      <Stage
        width={1000}
        height={1000}
        raf={false}
        renderOnComponentChange={true}
        options={{ backgroundAlpha: 0, antialias: true }}
      >
        {board &&
          board.map((hex) => (
            <Hexagon
              hex={hex}
              key={`${hex.x},${hex.y}`}
              updateHex={updateHex}
            />
          ))}
      </Stage>
    </div>
  );
}

export default testicles;
