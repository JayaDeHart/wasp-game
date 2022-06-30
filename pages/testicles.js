import React, { useCallback } from 'react';
import { extendHex, defineGrid } from 'honeycomb-grid';

import { Stage, Container, Sprite, Graphics } from '@inlet/react-pixi';
import Hexagon from '../components/Hexagon';

function testicles() {
  const Hex = extendHex({
    size: 15,
    orientation: 'flat',
  });

  const Grid = defineGrid(Hex);

  const testGrid = Grid.hexagon({ radius: 12, center: [12, 12] });

  return (
    <div className="flex justify-center align-middle">
      <Stage
        width={1000}
        height={1000}
        options={{ backgroundAlpha: 0 }}
        raf={false}
        renderOnComponentChange={true}
      >
        {testGrid.map((hex) => (
          <Hexagon hex={hex} />
        ))}
      </Stage>
    </div>
  );
}

export default testicles;
