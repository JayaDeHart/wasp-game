import { Graphics } from 'pixi.js';
import { PixiComponent, applyDefaultProps } from '@inlet/react-pixi';

export default PixiComponent('CustomHex', {
  create: (props) => new Graphics(),
  applyProps: (g, oldProps, props) => {
    console.log(oldProps);
    const { oldHex, ...oldP } = oldProps;
    const { hex, ...newP } = props;
    applyDefaultProps(g, oldP, newP);

    g.interactive = true;
    g.buttonMode = true;

    g.on('pointerdown', (e) => {
      console.log(hex);
    });

    if (hex !== oldHex) {
      g.lineStyle(1, 0x999999);
      const point = hex.toPoint();
      const corners = hex.corners().map((corner) => corner.add(point));
      const [firstCorner, ...otherCorners] = corners;
      g.moveTo(firstCorner.x, firstCorner.y);
      otherCorners.forEach(({ x, y }) => g.lineTo(x, y));
      g.lineTo(firstCorner.x, firstCorner.y);
    }
  },
});

//ok but how do we add interactive and pointerdown to this shit
