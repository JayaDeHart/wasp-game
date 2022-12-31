//this is only to test out generating the board. Eventually this will be done on the backend

const Honeycomb = require('honeycomb-grid');
function shuffle(array) {
    let copy = JSON.parse(JSON.stringify(array));
    for (let i = copy.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  
function generateBoard() {
  const innerResources = [
    'house',
    'car',
    'job',
    'wife',
    'house',
    'car',
    'job',
    'wife',
  ];

  const outerResources = ['kid', 'adultery', 'alcoholic', 'gambler'];

  const shuffledInner = shuffle(innerResources);
  const shuffledOuter = shuffle(outerResources);

  const middleIndices = [];
  const outerIndices = [];

  for (let x = 61; x <= 217; x++) {
    middleIndices.push(x);
  }

  for (let x = 218; x <= 468; x++) {
    outerIndices.push(x);
  }

  const smi = shuffle(middleIndices);
  const soi = shuffle(outerIndices);

  const Hex = Honeycomb.extendHex({
    size: 17,
    orientation: 'flat',
    tile: 'default',
  });

  const Grid = Honeycomb.defineGrid(Hex);

  const generatedGrid = Grid.spiral({ radius: 12, center: [12, 12] });

  shuffledInner.forEach((tile, index) => {
    generatedGrid[smi[index]].tile = tile;
  });

  shuffledOuter.forEach((tile, index) => {
    generatedGrid[soi[index]].tile = tile;
  });

  return generatedGrid;
}

module.exports = generateBoard;
