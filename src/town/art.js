// The town's art. Ground, buildings and scenery come from fan-made Gen 3
// style tilesets (see public/tiles/CREDITS.txt); the player is drawn in code.
import {
  T, MAP_W, MAP_H, BUILDINGS, PROPS, PROP_SIZE, tileAt, isPathLike, inForest, hash,
} from './map';

export const C = {
  ink: '#383848',
  forest: '#1F6B4E',
  cream: '#F8F8F8',
};

const mk = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

const r = (g, x, y, w, h, c) => {
  g.fillStyle = c;
  g.fillRect(x, y, w, h);
};

// Draw a sprite, then wrap it in a 1px dark outline.
function outlined(w, h, draw, color = C.ink) {
  const src = mk(w, h);
  draw(src.getContext('2d'));
  const mask = mk(w, h);
  const mg = mask.getContext('2d');
  mg.drawImage(src, 0, 0);
  mg.globalCompositeOperation = 'source-in';
  r(mg, 0, 0, w, h, color);
  const out = mk(w + 2, h + 2);
  const g = out.getContext('2d');
  [[0, 1], [2, 1], [1, 0], [1, 2]].forEach(([dx, dy]) => g.drawImage(mask, dx, dy));
  g.drawImage(src, 1, 1);
  return out;
}

/* ── Atlas (public/tiles/atlas.png, built from the tilesets) ─ */

// Positions in tiles: [x, y, w, h]
const SPR = {
  bush: [6, 2, 2, 2],
  berry: [8, 2, 2, 2],
  tips: [10, 2, 2, 2],
  flowers: [6, 4, 2, 2],
  sign: [8, 4, 2, 2],
  pine: [12, 0, 4, 6],
  bigTree: [0, 6, 6, 6],
};

const tile = (g, atlas, ax, ay, x, y) =>
  g.drawImage(atlas, ax * T, ay * T, T, T, x * T, y * T, T, T);

function drawGrass(g, atlas, x, y) {
  const h = hash(x, y);
  if (h < 0.14) tile(g, atlas, 7 + Math.floor(h * 21), 0, x, y); // tufts
  else tile(g, atlas, 6 + Math.floor(hash(y, x) * 4), 1, x, y);
}

// The stone road is a 6x6 block: border tiles on the outside, a 2x2
// repeating pattern inside.
function drawPath(g, atlas, x, y) {
  const n = isPathLike(x, y - 1);
  const s = isPathLike(x, y + 1);
  const w = isPathLike(x - 1, y);
  const e = isPathLike(x + 1, y);
  const ax = !w ? 0 : !e ? 5 : 1 + (x % 2);
  const ay = !n ? 0 : !s ? 5 : 1 + (y % 2);
  tile(g, atlas, ax, ay, x, y);
}

function drawMat(g, x, y, accent) {
  const X = x * T;
  const Y = y * T;
  r(g, X + 1, Y + 2, 14, 11, C.ink);
  r(g, X + 2, Y + 3, 12, 9, accent);
  r(g, X + 4, Y + 5, 8, 1, C.cream);
  r(g, X + 4, Y + 9, 8, 1, C.cream);
}

function drawFlowerTile(g, atlas, x, y) {
  drawGrass(g, atlas, x, y);
  const dx = tileAt(x - 1, y) === 'f' ? 1 : 0;
  const dy = tileAt(x, y - 1) === 'f' ? 1 : 0;
  const [ax, ay] = SPR.flowers;
  tile(g, atlas, ax + dx, ay + dy, x, y);
}

/* ── Sprites (buildings, props, forest) ───────────────────── */

// Every upright thing in town, with the row its base sits on so it can be
// drawn in depth order and redrawn over the player when in front.
function collectSprites(buildings) {
  const out = [];
  BUILDINGS.forEach((b) => {
    out.push({ img: buildings[b.id], x: b.x, y: b.y, w: b.w, h: b.h, base: b.y + b.h - 1, building: true });
  });
  PROPS.forEach((p) => {
    const [w, h] = PROP_SIZE[p.kind];
    out.push({ spr: SPR[p.kind], x: p.x, y: p.y, w, h, base: p.y + h - 1 });
  });
  // Pines on a staggered lattice, kept only where the whole sprite sits in
  // the forest band so no tree ever hangs over a walkable tile.
  const covered = (x0, y0, w, h) => {
    for (let y = y0; y < y0 + h; y++) {
      for (let x = x0; x < x0 + w; x++) {
        const out = x < 0 || y < 0 || x >= MAP_W || y >= MAP_H;
        if (!out && !inForest(x, y)) return false;
      }
    }
    return true;
  };
  for (let by = -2; by <= MAP_H + 4; by += 2) {
    const shift = (by / 2) % 2 ? 1 : -1;
    for (let ax = shift - 3; ax < MAP_W + 2; ax += 3) {
      const ay = by - 5;
      if (covered(ax, ay, 4, 6)) out.push({ spr: SPR.pine, x: ax, y: ay, w: 4, h: 6, base: by });
    }
  }
  out.sort((a, b) => a.base - b.base);
  return out;
}

export function drawSprite(g, atlas, s, scale = 1, ox = 0, oy = 0) {
  const dx = s.x * T * scale - ox;
  const dy = s.y * T * scale - oy;
  const dw = s.w * T * scale;
  const dh = s.h * T * scale;
  if (s.img) g.drawImage(s.img, dx, dy, dw, dh);
  else {
    const [ax, ay, w, h] = s.spr;
    g.drawImage(atlas, ax * T, ay * T, w * T, h * T, dx, dy, dw, dh);
  }
}

// Where each building's name plate sits, in world pixels from its top.
export const labelOffset = (b) => b.labelY;

/* ── Whole-map render ─────────────────────────────────────── */

function renderMap(atlas, sprites) {
  const c = mk(MAP_W * T, MAP_H * T);
  const g = c.getContext('2d');
  const matAccent = {};
  BUILDINGS.forEach((b) =>
    b.doors.forEach((d) => (matAccent[`${b.x + d},${b.y + b.h}`] = b.accent))
  );

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const t = tileAt(x, y);
      if (t === 'p' || t === 'm') {
        drawPath(g, atlas, x, y);
        if (t === 'm') drawMat(g, x, y, matAccent[`${x},${y}`]);
      } else if (t === 'f') drawFlowerTile(g, atlas, x, y);
      else drawGrass(g, atlas, x, y);
      if (inForest(x, y)) {
        g.fillStyle = 'rgba(16, 70, 50, .45)';
        g.fillRect(x * T, y * T, T, T);
      }
    }
  }
  sprites.forEach((s) => drawSprite(g, atlas, s));
  return c;
}

/* ── Player ───────────────────────────────────────────────── */

function drawPlayer(g, dir, f) {
  // big head, small body, like a handheld-era overworld sprite
  const skin = '#F8D0A8';
  const hair = '#40302C';
  const hood = '#7050C8';
  const hoodD = '#503898';
  const pants = '#485888';
  const shoe = '#F8F8F8';
  const eye = '#283048';

  if (dir === 'right') {
    g.translate(16, 0);
    g.scale(-1, 1);
  }

  if (dir === 'left' || dir === 'right') {
    if (f === 1) {
      r(g, 4, 16, 2, 2, pants);
      r(g, 9, 16, 2, 2, pants);
      r(g, 3, 18, 3, 1, shoe);
      r(g, 8, 18, 3, 1, shoe);
    } else {
      r(g, 6, 16, 4, f === 2 ? 1 : 2, pants);
      r(g, 5, f === 2 ? 17 : 18, 5, 1, shoe);
    }
    r(g, 5, 10, 7, 6, hood);
    r(g, 9, 10, 3, 3, hoodD);
    const ax = f === 1 ? 6 : f === 2 ? 8 : 7;
    r(g, ax, 11, 2, 3, hoodD);
    r(g, ax, 14, 2, 1, skin);
    r(g, 3, 0, 10, 1, hair);
    r(g, 2, 1, 12, 5, hair);
    r(g, 3, 5, 8, 4, skin);
    r(g, 4, 9, 6, 1, skin);
    r(g, 10, 5, 4, 4, hair);
    r(g, 3, 5, 8, 1, hair);
    r(g, 4, 7, 1, 2, eye);
    return;
  }

  const lift = (side) => (f === side ? 1 : 0);
  r(g, 5, 16, 2, 2 - lift(1), pants);
  r(g, 5, 18 - lift(1), 2, 1, shoe);
  r(g, 9, 16, 2, 2 - lift(2), pants);
  r(g, 9, 18 - lift(2), 2, 1, shoe);
  r(g, 4, 10, 8, 6, hood);
  r(g, 3, 10, 1, 4, hoodD);
  r(g, 12, 10, 1, 4, hoodD);
  r(g, 3, 14, 1, 1, skin);
  r(g, 12, 14, 1, 1, skin);
  r(g, 3, 0, 10, 1, hair);
  r(g, 2, 1, 12, 5, hair);

  if (dir === 'down') {
    r(g, 6, 13, 4, 2, hoodD);
    r(g, 2, 6, 1, 2, skin);
    r(g, 13, 6, 1, 2, skin);
    r(g, 3, 5, 10, 4, skin);
    r(g, 4, 9, 8, 1, skin);
    r(g, 3, 5, 10, 1, hair);
    r(g, 3, 6, 2, 1, hair);
    r(g, 11, 6, 2, 1, hair);
    r(g, 5, 7, 1, 2, eye);
    r(g, 10, 7, 1, 2, eye);
  } else {
    r(g, 2, 6, 12, 3, hair);
    r(g, 6, 9, 4, 1, skin);
    r(g, 5, 10, 6, 3, hoodD);
  }
}

function makeArrow() {
  return outlined(7, 4, (g) => {
    r(g, 0, 0, 7, 1, '#F8DC5A');
    r(g, 1, 1, 5, 1, '#F8DC5A');
    r(g, 2, 2, 3, 1, '#F8DC5A');
    r(g, 3, 3, 1, 1, '#F8DC5A');
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });
}

export async function buildArt() {
  const base = `${process.env.PUBLIC_URL}/tiles`;
  const [atlas, ...loaded] = await Promise.all([
    loadImage(`${base}/atlas.png`),
    ...BUILDINGS.map((b) => loadImage(`${base}/${b.id}.png`)),
  ]);
  const buildings = {};
  BUILDINGS.forEach((b, i) => (buildings[b.id] = loaded[i]));

  const sprites = collectSprites(buildings);
  const map = renderMap(atlas, sprites);
  const player = {};
  ['down', 'up', 'left', 'right'].forEach((dir) => {
    player[dir] = [0, 1, 2].map((f) => outlined(16, 20, (g) => drawPlayer(g, dir, f)));
  });
  return {
    frames: [map, map],
    atlas,
    // things that can stand in front of the player
    front: sprites.filter((s) => !s.building && s.spr !== SPR.pine),
    player,
    arrow: makeArrow(),
  };
}
