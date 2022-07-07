import React, { useCallback } from 'react';
import { extendHex, defineGrid } from 'honeycomb-grid';

import { Stage, Container, Sprite, Graphics } from '@inlet/react-pixi';
import Hexagon from '../components/Hexagon';
import CustomHexagon from '../components/CustomHexagon';

function testicles() {
  const Hex = extendHex({
    size: 17,
    orientation: 'flat',
    color: '0xc2c0c0',
    setColor(color) {
      this.color = color;
      console.log(this.color);
    },
  });

  const Grid = defineGrid(Hex);

  const testGrid = Grid.hexagon({ radius: 12, center: [12, 12] });

  function setColor(hex) {
    // const { x, y } = hex;
    // const updated = Hex({ x, y, color: '0x8d9db5' });
    // testGrid.set([x, y], updated);
    // console.log(testGrid.get([x, y]));
    hex.setColor('0x8d9db5');
  }

  return (
    <div className="flex justify-center align-middle">
      <Stage width={1000} height={1000} options={{ backgroundAlpha: 0 }}>
        {testGrid.map((hex, index) => (
          <Hexagon hex={hex} key={index} setColor={setColor} />
        ))}
      </Stage>
    </div>
  );
}

export default testicles;
