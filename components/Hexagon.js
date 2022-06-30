import { Graphics } from '@inlet/react-pixi';
import { useCallback } from 'react';

function Hexagon({ hex }) {
  console.log(hex);
  const draw = useCallback((g) => {
    g.lineStyle(1, 0x999999);
    const point = hex.toPoint();
    const corners = hex.corners().map((corner) => corner.add(point));
    const [firstCorner, ...otherCorners] = corners;
    g.moveTo(firstCorner.x, firstCorner.y);
    otherCorners.forEach(({ x, y }) => g.lineTo(x, y));
    g.lineTo(firstCorner.x, firstCorner.y);
  }, []);

  return <Graphics draw={draw} />;
}

export default Hexagon;
