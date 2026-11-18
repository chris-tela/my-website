import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import TownCanvas from './town/TownCanvas';
import DPad from './town/DPad';
import { SECTIONS, Credits } from './town/Sections';
import { BUILDINGS } from './town/map';

const accentOf = (id) => BUILDINGS.find((b) => b.id === id).accent;

function App() {
  const [doorId, setDoorId] = useState(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [hint, setHint] = useState(true);
  const guideButton = useRef(null);
  const closeButton = useRef(null);

  const onStand = useCallback((id) => setDoorId(id), []);
  const onFirstMove = useCallback(() => setHint(false), []);

  const closeGuide = useCallback(() => {
    setGuideOpen(false);
    if (guideButton.current) guideButton.current.focus();
  }, []);

  useEffect(() => {
    if (guideOpen && closeButton.current) closeButton.current.focus();
  }, [guideOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (guideOpen) closeGuide();
      else setDoorId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [guideOpen, closeGuide]);

  const door = SECTIONS.find((s) => s.id === doorId);

  return (
    <div className="game">
      <header className="hud">
        <h1 className="plate">
          Tela Town
          <small>Chris Tela's portfolio</small>
        </h1>
        <div className="hud__actions">
          <a className="btn btn--quiet" href="/portfolio">
            Plain view
          </a>
          <button
            type="button"
            className="btn"
            ref={guideButton}
            onClick={() => setGuideOpen(true)}
          >
            See everything
          </button>
        </div>
      </header>

      <TownCanvas
        panelOpen={!!door && !guideOpen}
        paused={guideOpen}
        onStand={onStand}
        onFirstMove={onFirstMove}
      />

      {!guideOpen && <DPad raised={!!door} />}

      {hint && !door && !guideOpen && (
        <p className="box hint">
          <span className="if-keys">
            Welcome to Tela Town. Walk with WASD or the arrow keys, or click
            where you want to go.
          </span>
          <span className="if-touch">
            Welcome to Tela Town. Walk with the pad, or tap where you want to go.
          </span>{' '}
          Step on a doormat to see what's inside.
        </p>
      )}

      <div aria-live="polite">
        {door && !guideOpen && (
          <aside
            className="box door"
            aria-label={door.title}
            style={{ '--accent': accentOf(door.id) }}
          >
            <div className="door__head">
              <h2>{door.title}</h2>
              <button type="button" className="btn btn--quiet" onClick={() => setDoorId(null)}>
                Close
              </button>
            </div>
            <div className="door__body">
              <door.Body />
            </div>
          </aside>
        )}
      </div>

      {guideOpen && (
        <div className="scrim" onClick={closeGuide}>
          <div
            className="box guide"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="guide__head">
              <h2 id="guide-title">Everything in Tela Town</h2>
              <button type="button" className="btn" ref={closeButton} onClick={closeGuide}>
                Back to town
              </button>
            </div>
            <div className="guide__body">
              {SECTIONS.map((s) => (
                <section key={s.id} style={{ '--accent': accentOf(s.id) }}>
                  <h2 className="tab">{s.title}</h2>
                  <s.Body />
                </section>
              ))}
              <section>
                <h2 className="tab">Credits</h2>
                <Credits />
              </section>
            </div>
          </div>
        </div>
      )}

      <Analytics />
    </div>
  );
}

export default App;
