// On-screen direction pad for touch screens. It presses and releases the
// same arrow keys the keyboard uses, so the walking code doesn't change.
// Sliding your thumb across the pad switches direction without lifting.
import React, { useEffect, useRef, useState } from 'react';

const KEY = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' };
const send = (type, dir) => window.dispatchEvent(new KeyboardEvent(type, { key: KEY[dir] }));

export default function DPad({ raised }) {
  const ref = useRef(null);
  const [dir, setDir] = useState(null);
  const current = useRef(null);

  const press = (next) => {
    if (next === current.current) return;
    if (current.current) send('keyup', current.current);
    if (next) send('keydown', next);
    current.current = next;
    setDir(next);
  };

  // Which arm of the pad the thumb is over; the middle counts as nothing.
  const dirAt = (e) => {
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < r.width * 0.12) return null;
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    return dy > 0 ? 'down' : 'up';
  };

  const onDown = (e) => {
    e.preventDefault();
    ref.current.setPointerCapture(e.pointerId);
    press(dirAt(e));
  };
  const onMove = (e) => {
    if (current.current !== null || e.buttons) press(dirAt(e));
  };
  const onUp = () => press(null);

  // let go if the pad disappears mid-press
  useEffect(() => () => current.current && send('keyup', current.current), []);

  return (
    <div
      ref={ref}
      className={`dpad${raised ? ' dpad--raised' : ''}`}
      aria-hidden="true"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      {['up', 'right', 'down', 'left'].map((d) => (
        <span key={d} className={`dpad__arm dpad__arm--${d}${dir === d ? ' is-on' : ''}`} />
      ))}
      <span className="dpad__hub" />
    </div>
  );
}
