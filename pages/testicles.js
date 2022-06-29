import React from 'react';
import { extendHex, defineGrid } from 'honeycomb-grid';

function testicles() {
  const Hex = extendHex({
    size: 30,
    orientation: 'flat',
  });

  const Grid = defineGrid(Hex);

  const testGrid = Grid.hexagon({ radius: 12 });

  console.log(testGrid);

  return <div>testicles</div>;
}

export default testicles;
