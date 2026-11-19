import React, { useEffect, useRef } from 'react';
import {
  T, MAP_W, MAP_H, START, BUILDINGS, DIRS,
  walkable, buildingAt, matAt, findPath,
} from './map';
import { buildArt, labelOffset, drawSprite, C } from './art';

const SPEED = 6.5; // tiles per second
const KEYS = {
  w: 'up', arrowup: 'up',
  s: 'down', arrowdown: 'down',
  a: 'left', arrowleft: 'left',
  d: 'right', arrowright: 'right',
};
const MW = MAP_W * T;
const MH = MAP_H * T;

export default function TownCanvas({ panelOpen, paused, onStand, onFirstMove }) {
  const ref = useRef(null);
  const live = useRef({});
  live.current = { panelOpen, paused, onStand, onFirstMove };

  useEffect(() => {
    const canvas = ref.current;
    let ctx = null;
    try {
      ctx = canvas.getContext('2d');
    } catch (e) {
      ctx = null;
    }
    if (!ctx) return undefined;

    let art = null;
    let stopped = false;
    buildArt()
      .then((made) => {
        if (!stopped) art = made;
      })
      .catch((err) => console.error(err));
    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const p = { x: START.x, y: START.y, tx: START.x, ty: START.y, t: 0, dir: 'down', moving: false, steps: 0 };
    let held = [];
    let tap = null; // a key pressed and released between frames still counts
    let path = [];
    let standing = null;
    let moved = false;
    let P = 2; // device pixels per world pixel
    let dpr = 1;
    let ox = 0;
    let oy = 0;
    let insetR = 0;
    let insetB = 0;
    let clock = 0;
    let last = performance.now();
    let raf = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const fit = Math.floor(Math.min(w / 480, h / 300));
      const css = Math.min(4, Math.max(2, fit));
      P = Math.max(1, Math.round(css * dpr));
    };

    const arrive = () => {
      const id = matAt(p.x, p.y);
      if (id !== standing) {
        standing = id;
        live.current.onStand(id);
      }
    };

    const step = (dt) => {
      let budget = dt * SPEED;
      while (budget > 0) {
        if (!p.moving) {
          if (held.length || tap) path = [];
          const dir = held.length ? held[held.length - 1] : tap || path.shift();
          tap = null;
          if (!dir) break;
          p.dir = dir;
          const nx = p.x + DIRS[dir][0];
          const ny = p.y + DIRS[dir][1];
          if (!walkable(nx, ny)) {
            path = [];
            break;
          }
          p.moving = true;
          p.tx = nx;
          p.ty = ny;
          p.t = 0;
          if (!moved) {
            moved = true;
            live.current.onFirstMove();
          }
        }
        const use = Math.min(1 - p.t, budget);
        p.t += use;
        budget -= use;
        if (p.t >= 1) {
          p.x = p.tx;
          p.y = p.ty;
          p.moving = false;
          p.t = 0;
          p.steps++;
          arrive();
        }
      }
    };

    const clampCam = (want, view, size, inset) =>
      view - inset >= size
        ? (size - (view - inset)) / 2
        : Math.max(0, Math.min(size - view + inset, want));

    const draw = (dt) => {
      const fx = p.moving ? p.x + (p.tx - p.x) * p.t : p.x;
      const fy = p.moving ? p.y + (p.ty - p.y) * p.t : p.y;
      const vw = canvas.width / P;
      const vh = canvas.height / P;

      // Keep the player clear of the open info panel.
      let wantR = 0;
      let wantB = 0;
      if (live.current.panelOpen) {
        if (window.innerWidth >= 720) wantR = (456 * dpr) / P;
        else wantB = (canvas.height * 0.46) / P;
      }
      const k = reduce ? 1 : 1 - Math.exp(-dt * 10);
      insetR += (wantR - insetR) * k;
      insetB += (wantB - insetB) * k;

      const camX = clampCam(fx * T + 8 - (vw - insetR) / 2, vw, MW, insetR);
      const camY = clampCam(fy * T + 8 - (vh - insetB) / 2, vh, MH, insetB);
      ox = Math.round(camX * P);
      oy = Math.round(camY * P);
      const sx = (wx) => Math.round(wx * P) - ox;
      const sy = (wy) => Math.round(wy * P) - oy;

      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = C.forest;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const frame = reduce ? 0 : Math.floor(clock * 1.6) % 2;
      ctx.drawImage(art.frames[frame], -ox, -oy, MW * P, MH * P);

      // door markers
      const bob = reduce ? 0 : Math.floor(clock * 2.5) % 2;
      BUILDINGS.forEach((b) => {
        if (standing === b.id) return;
        b.doors.forEach((d) => {
          ctx.drawImage(
            art.arrow,
            sx((b.x + d) * T + 3.5),
            sy((b.y + b.h - 1) * T - 8 + bob),
            art.arrow.width * P,
            art.arrow.height * P
          );
        });
      });

      // player
      const px = fx * T;
      const py = fy * T;
      ctx.fillStyle = 'rgba(40,48,74,.28)';
      ctx.fillRect(sx(px + 3), sy(py + 13), 10 * P, 3 * P);
      const f = p.moving && p.t < 0.5 ? (p.steps % 2 ? 1 : 2) : 0;
      const sprite = art.player[p.dir][f];
      ctx.drawImage(sprite, sx(px - 1), sy(py - 5), sprite.width * P, sprite.height * P);

      // scenery whose base is below the player stands in front of them
      const row = Math.ceil(fy);
      art.front.forEach((spr) => {
        if (spr.base <= row || spr.base > row + 6) return;
        if (spr.x > fx + 1 || spr.x + spr.w < fx) return;
        drawSprite(ctx, art.atlas, spr, P, ox, oy);
      });

      // building name plates
      ctx.font = `${6 * P}px "Press Start 2P", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      BUILDINGS.forEach((b) => {
        const tw = Math.ceil(ctx.measureText(b.label).width);
        const w = tw + 7 * P;
        const h = 12 * P;
        const cx = sx((b.x + b.w / 2) * T);
        const cy = sy(b.y * T + labelOffset(b));
        const x = Math.round(cx - w / 2);
        const y = Math.round(cy - h / 2);
        ctx.fillStyle = C.ink;
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = C.cream;
        ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P);
        ctx.fillStyle = b.accent;
        ctx.fillRect(x + P, y + h - 3 * P, w - 2 * P, 2 * P);
        ctx.fillStyle = C.ink;
        ctx.fillText(b.label, cx + P * 0.5, cy - P * 0.5);
      });
    };

    const loop = (now) => {
      const dt = Math.max(0, Math.min(0.1, (now - last) / 1000));
      last = now;
      clock += dt;
      if (live.current.paused) {
        held = [];
        path = [];
        tap = null;
      } else step(dt);
      if (art) draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const onKeyDown = (e) => {
      if (live.current.paused || e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      const dir = KEYS[key];
      if (dir) {
        e.preventDefault();
        if (!held.includes(dir)) {
          held.push(dir);
          tap = dir;
        }
        return;
      }
      const onControl = e.target.closest && e.target.closest('a, button');
      if ((key === 'enter' || key === ' ' || key === 'e') && !onControl && standing) {
        e.preventDefault();
        live.current.onStand(standing);
      }
    };
    const onKeyUp = (e) => {
      const dir = KEYS[e.key.toLowerCase()];
      if (dir) held = held.filter((d) => d !== dir);
    };
    const onBlur = () => {
      held = [];
    };

    const onPointerDown = (e) => {
      if (live.current.paused) return;
      // Touch users move with the d-pad only; tap-to-walk is mouse/pen only.
      if (e.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      const ratio = canvas.width / rect.width;
      const tx = Math.floor(((e.clientX - rect.left) * ratio + ox) / P / T);
      const ty = Math.floor(((e.clientY - rect.top) * ratio + oy) / P / T);
      let target = null;
      const b = buildingAt(tx, ty);
      if (b) target = { x: b.x + b.doors[0], y: b.y + b.h };
      else if (walkable(tx, ty)) target = { x: tx, y: ty };
      else {
        // nearest walkable tile within two steps
        let best = Infinity;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const d = Math.abs(dx) + Math.abs(dy);
            if (d < best && walkable(tx + dx, ty + dy)) {
              best = d;
              target = { x: tx + dx, y: ty + dy };
            }
          }
        }
      }
      if (!target) return;
      const from = p.moving ? { x: p.tx, y: p.ty } : { x: p.x, y: p.y };
      path = findPath(from, target) || [];
      held = [];
    };

    resize();
    if (document.fonts && document.fonts.load) {
      document.fonts.load('18px "Press Start 2P"').catch(() => {});
    }
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    canvas.addEventListener('pointerdown', onPointerDown);
    raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="town"
      role="img"
      aria-label="A pixel-art town. Each building holds part of Chris Tela's portfolio: about me, work, projects, resume, hobbies and contact. Use the See everything button to read it all without walking."
    />
  );
}
