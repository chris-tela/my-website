// The town layout: a tile grid, the six buildings, scenery and walking rules.

export const T = 16; // tile size in world pixels
export const MAP_W = 56;
export const MAP_H = 44;
export const START = { x: 27, y: 22 };
const EDGE = 3; // depth of the forest band around the town

// x/y/w/h are in tiles and match each building's image in public/tiles.
// `doors` are column offsets along the bottom row; `labelY` is where the
// name plate sits, in pixels from the top of the image.
export const BUILDINGS = [
  { id: 'projects', label: 'Projects', x: 21, y: 3, w: 14, h: 16, doors: [6, 7], labelY: 150, accent: '#A34AA0' },
  { id: 'work', label: 'Work', x: 5, y: 9, w: 14, h: 10, doors: [6, 7], labelY: 104, accent: '#9A6A3E' },
  { id: 'contact', label: 'Contact', x: 38, y: 10, w: 10, h: 9, doors: [4, 5], labelY: 30, accent: '#E0523A' },
  { id: 'resume', label: 'Resume', x: 6, y: 26, w: 8, h: 8, doors: [2], labelY: 30, accent: '#2FA3B5' },
  { id: 'about', label: 'About me', x: 17, y: 26, w: 10, h: 8, doors: [4], labelY: 40, accent: '#B04C9E' },
  { id: 'hobbies', label: 'Hobbies', x: 38, y: 26, w: 12, h: 8, doors: [2], labelY: 34, accent: '#6E86A8' },
];

export function hash(x, y) {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

// Tile codes: g grass, f flowers (walkable), p path, m doormat,
// t forest / tree trunk, b bush, s sign, B building
const grid = Array.from({ length: MAP_H }, () => Array(MAP_W).fill('g'));
const fill = (x0, y0, x1, y1, c) => {
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) grid[y][x] = c;
};

const SOUTH = 37; // first row of the forest below the south street
export const inForest = (x, y) =>
  x < EDGE || x >= MAP_W - EDGE || y < EDGE || y >= SOUTH;

for (let y = 0; y < MAP_H; y++) {
  for (let x = 0; x < MAP_W; x++) if (inForest(x, y)) grid[y][x] = 't';
}

fill(EDGE, 19, MAP_W - EDGE - 1, 20, 'p'); // main street
fill(EDGE, 34, MAP_W - EDGE - 1, 35, 'p'); // south street
fill(27, 21, 28, 33, 'p'); // avenue between them

// Scenery objects, drawn as sprites. Each blocks a 2x2 base.
// kind: bigTree (6x6 sprite), bush, berry (flowering bush), sign, tips
export const PROPS = [
  { kind: 'bigTree', x: 30, y: 26 },
  { kind: 'bigTree', x: 46, y: 3 },
  { kind: 'bigTree', x: 3, y: 2 },
  { kind: 'bush', x: 35, y: 22 }, { kind: 'bush', x: 37, y: 22 },
  { kind: 'berry', x: 20, y: 22 },
  { kind: 'bush', x: 14, y: 26 }, { kind: 'berry', x: 14, y: 28 },
  { kind: 'bush', x: 51, y: 22 }, { kind: 'berry', x: 51, y: 28 },
  { kind: 'bush', x: 3, y: 22 }, { kind: 'berry', x: 3, y: 28 },
  { kind: 'tips', x: 29, y: 21 },
  { kind: 'sign', x: 15, y: 32 },
];
export const PROP_SIZE = { bigTree: [6, 6], bush: [2, 2], berry: [2, 2], sign: [2, 2], tips: [2, 2] };
// The bottom-centre 2x2 of each sprite is solid.
export const propBase = (p) => {
  const [w, h] = PROP_SIZE[p.kind];
  return { x: p.x + Math.floor((w - 2) / 2), y: p.y + h - 2 };
};
PROPS.forEach((p) => {
  const b = propBase(p);
  fill(b.x, b.y, b.x + 1, b.y + 1, p.kind === 'sign' || p.kind === 'tips' ? 's' : 'b');
});

// Flower beds, 2x2 each, walkable.
[
  [31, 22], [9, 22], [42, 22], [46, 30], [24, 22], [36, 6], [17, 5], [11, 5], [50, 14], [19, 14], [36, 14],
].forEach(([x, y]) => {
  // Only plant a whole bed: skip it if any tile is taken or under a building,
  // so a building can never cut a flower in half.
  const cells = [[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]];
  const underBuilding = ([cx, cy]) =>
    BUILDINGS.some((b) => cx >= b.x && cx < b.x + b.w && cy >= b.y && cy <= b.y + b.h);
  if (cells.some(([cx, cy]) => grid[cy][cx] !== 'g' || underBuilding([cx, cy]))) return;
  cells.forEach(([cx, cy]) => (grid[cy][cx] = 'f'));
});

BUILDINGS.forEach((b) => {
  fill(b.x, b.y, b.x + b.w - 1, b.y + b.h - 1, 'B');
  b.doors.forEach((d) => (grid[b.y + b.h][b.x + d] = 'm'));
});

export const tileAt = (x, y) =>
  x < 0 || y < 0 || x >= MAP_W || y >= MAP_H ? 't' : grid[y][x];

export const isPathLike = (x, y) => 'pm'.includes(tileAt(x, y));
export const walkable = (x, y) => 'gfpm'.includes(tileAt(x, y));

export const buildingAt = (x, y) =>
  BUILDINGS.find((b) => x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h);

// Which building's doormat is this tile, if any.
export const matAt = (x, y) => {
  if (tileAt(x, y) !== 'm') return null;
  const b = buildingAt(x, y - 1);
  return b ? b.id : null;
};

export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// Breadth-first route between two tiles, as a list of directions.
export function findPath(from, to) {
  if (!walkable(to.x, to.y)) return null;
  const key = (x, y) => y * MAP_W + x;
  const prev = new Map([[key(from.x, from.y), null]]);
  const queue = [[from.x, from.y]];
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === to.x && y === to.y) {
      const out = [];
      let k = key(x, y);
      while (prev.get(k)) {
        const step = prev.get(k);
        out.unshift(step.dir);
        k = step.from;
      }
      return out;
    }
    for (const dir of Object.keys(DIRS)) {
      const nx = x + DIRS[dir][0];
      const ny = y + DIRS[dir][1];
      const nk = key(nx, ny);
      if (prev.has(nk) || !walkable(nx, ny)) continue;
      prev.set(nk, { dir, from: key(x, y) });
      queue.push([nx, ny]);
    }
  }
  return null;
}
