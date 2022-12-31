import { extendHex, defineGrid } from 'honeycomb-grid';
import Hexagon from '../components/Hexagon';
import { Stage } from '@inlet/react-pixi';

const OuterHex = extendHex({
  size: 17,
  orientation: 'flat',
  color: '0xc2c0c0',
});

const InnerHex = extendHex({
  size: 17,
  orientation: 'flat',
  color: '0xffffff',
});

const OuterGrid = defineGrid(OuterHex);

const InnerGrid = defineGrid(InnerHex);

const ogrid = OuterGrid.ring({ radius: 12, center: [12, 12] });
const igrid = InnerGrid.ring({ radius: 11, center: [12, 12] });

console.log('before', ogrid);

igrid.forEach((hex) => {
  ogrid.push(hex);
});

console.log('after', ogrid);

ogrid[0].color = '0x000000';

console.log(ogrid[0]);

function Generate() {
  return (
    <div className="flex justify-center align-middle">
      <Stage
        width={1000}
        height={1000}
        raf={false}
        renderOnComponentChange={true}
        options={{ backgroundAlpha: 0, antialias: true }}
      >
        {ogrid.map((hex) => (
          <Hexagon hex={hex} key={`${hex.x},${hex.y}`} />
        ))}
      </Stage>
    </div>
  );
}

export default Generate;
