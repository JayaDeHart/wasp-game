import { Sprite } from '@inlet/react-pixi';
import { useCallback } from 'react';
import adultury from './adultery.png'

function Hexagon(props) {
  const { hex, updateHex, index } = props;
  const draw = useCallback(
    (g) => {
      g.lineStyle(0.5, '0x000000');
      const point = hex.toPoint();
      const corners = hex.corners().map((corner) => corner.add(point));
      g.beginFill(hex.color);
      g.drawPolygon(corners);
      g.endFill();
    },
    [props]
  );

  const point = hex.toPoint();

  return (
    <Sprite image={`./tiles/${hex.tile}.png`} x={point.x} y={point.y} height={30} width={30} />
  );
}

export default Hexagon;
