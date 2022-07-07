import { Graphics } from '@inlet/react-pixi';
import { useCallback } from 'react';

function Hexagon(props) {
  const { hex } = props;
  const draw = useCallback(
    (g) => {
      g.lineStyle(0.5, '0x000000');
      const point = hex.toPoint();
      const corners = hex.corners().map((corner) => corner.add(point));
      g.beginFill(hex.color);
      g.drawPolygon(corners);
      g.endFill();
    },
    [hex]
  );

  return (
    <Graphics
      draw={draw}
      interactive={true}
      mousedown={() => {
        console.log(hex);
        hex.setColor('0x8d9db5');
      }}
    />
  );
}

export default Hexagon;
