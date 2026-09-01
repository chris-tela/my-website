import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

const SECTIONS = [
  { id: 'intro', label: 'who', color: 'oklch(0.55 0.19 250)' },
  { id: 'now', label: 'now', color: 'oklch(0.82 0.17 90)' },
  { id: 'work', label: 'work', color: 'oklch(0.6 0.16 155)' },
  { id: 'projects', label: 'projects', color: 'oklch(0.55 0.19 250)' },
  { id: 'hobbies', label: 'hobbies', color: 'oklch(0.6 0.2 28)' },
  { id: 'links', label: 'say hi', color: 'oklch(0.2 0.02 250)' },
];

function App() {
  const [active, setActive] = useState('intro');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site">
      <div className="ct-mark">CT</div>

      <nav className="dot-nav" aria-label="Section navigation">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={s.label}
            className={`dot${active === s.id ? ' active' : ''}`}
            style={{ '--dot-color': s.color }}
          />
        ))}
      </nav>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section
        id="intro"
        className="sec sec--intro"
        style={{ '--band-color': 'oklch(0.55 0.19 250)' }}
      >
        <div className="band" />
        <div className="vlabel-wrap">
          <div className="vlabel">who</div>
        </div>
        <div className="sec-num">01 / WHO</div>
        <h1 className="hero-name">
          chris
          <br />
          tela
        </h1>
        <div className="tag-row">
          <a href="#now" className="tag tag--yellow">NOW</a>
          <a href="#work" className="tag tag--green">WORK</a>
          <a href="#projects" className="tag tag--blue">PROJECTS</a>
          <a href="#hobbies" className="tag tag--orange">HOBBIES</a>
          <a href="#links" className="tag tag--dark">SAY HI</a>
        </div>
      </section>

      {/* ── NOW ───────────────────────────────────────────── */}
      <section
        id="now"
        className="sec"
        style={{ '--band-color': 'oklch(0.82 0.17 90)' }}
      >
        <div className="band" />
        <div className="vlabel-wrap">
          <div className="vlabel">now</div>
        </div>
        <div className="sec-num-row">
          <div className="sec-num">02 / NOW</div>
          <div
            className="sec-num-bar"
            style={{ background: 'oklch(0.82 0.17 90)' }}
          />
        </div>
        <h2 className="sec-heading">what i'm up to</h2>
        <div className="now-grid">
          <div className="now-card now-card--highlight">
            <div className="now-card__label">STUDYING</div>
            <div className="now-card__value">third year, western cs</div>
          </div>
          <div className="now-card">
            <div className="now-card__label">LOOKING FOR</div>
            <div className="now-card__value">winter &amp; summer 2027 internships</div>
          </div>
          <div className="now-card">
            <div className="now-card__label">SOFTWARE INTERESTS</div>
            <div className="now-card__value">full-stack, QA, AI/ML, backend</div>
          </div>
        </div>
      </section>

      {/* ── WORK ──────────────────────────────────────────── */}
      <section
        id="work"
        className="sec"
        style={{ '--band-color': 'oklch(0.6 0.16 155)' }}
      >
        <div className="band" />
        <div className="vlabel-wrap">
          <div className="vlabel">work</div>
        </div>
        <div className="sec-num-row">
          <div className="sec-num">03 / WORK</div>
          <div
            className="sec-num-bar"
            style={{ background: 'oklch(0.6 0.16 155)' }}
          />
        </div>
        <h2 className="sec-heading">
          where i have{' '}
          <span style={{ color: 'oklch(0.6 0.16 155)' }}>shipped things</span>
        </h2>
        <div className="work-list">
          {/* RBC — featured */}
          <div className="work-card work-card--featured">
            <div>
              <div className="work-card__label-featured">MOST RECENT</div>
              <div className="work-card__dates" style={{ marginTop: 6 }}>
                summer 2026
                <br />4 months
              </div>
            </div>
            <div>
              <div className="work-card__title">
                automation engineer intern
              </div>
              <div className="work-card__company">
                RBC (ROYAL BANK OF CANADA)
              </div>
              <p className="work-card__desc">
                built API validation and E2E test suites for consumer credit
                card flows. engineered an AI pipeline to generate test cases
                from Jira stories and publish docs to Confluence.
              </p>
              <div className="work-card__tags">
                <span className="tech-tag">PLAYWRIGHT</span>
                <span className="tech-tag">TYPESCRIPT</span>
                <span className="tech-tag">PYTHON</span>
              </div>
            </div>
          </div>

          {/* Trojan Technologies */}
          <div className="work-card">
            <div className="work-card__dates">
              may 2025 – may 2026
              <br />
              12 months
            </div>
            <div>
              <div className="work-card__title">
                software developer &amp; QA intern
              </div>
              <div className="work-card__company">TROJAN TECHNOLOGIES</div>
              <p className="work-card__desc">
                built test automation frameworks and CI/CD pipelines for
                hardware product validation.
              </p>
              <div className="work-card__tags">
                <span className="tech-tag">C#</span>
                <span className="tech-tag">JENKINS</span>
                <span className="tech-tag">XUNIT</span>
                <span className="tech-tag">PROXMOX</span>
              </div>
            </div>
          </div>

          {/* SKI.Education */}
          <div className="work-card">
            <div className="work-card__dates">jan – mar 2026</div>
            <div>
              <div className="work-card__title">web developer</div>
              <div className="work-card__company">SKI.EDUCATION NETWORK</div>
              <p className="work-card__desc">
                built web solutions for an education platform connecting students
                with international universities.
              </p>
            </div>
          </div>

          {/* Western Developers Society */}
          <div className="work-card">
            <div className="work-card__dates">sept 2024 – apr 2025</div>
            <div>
              <div className="work-card__title">full-stack engineer</div>
              <div className="work-card__company">
                WESTERN DEVELOPERS SOCIETY
              </div>
              <p className="work-card__desc">
                developed a council management app to automate speaking order,
                attendance, and voting.
              </p>
            </div>
          </div>

          {/* Tethos */}
          <div className="work-card">
            <div className="work-card__dates">sept 2024 – apr 2025</div>
            <div>
              <div className="work-card__title">software developer</div>
              <div className="work-card__company">TETHOS ASSOCIATION</div>
              <p className="work-card__desc">
                integrated real-time APIs and built PostgreSQL schemas for a
                social services accessibility app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────── */}
      <section
        id="projects"
        className="sec"
        style={{ '--band-color': 'oklch(0.55 0.19 250)' }}
      >
        <div className="band" />
        <div className="vlabel-wrap">
          <div className="vlabel">projects</div>
        </div>
        <div className="sec-num-row">
          <div className="sec-num">04 / PROJECTS</div>
          <div
            className="sec-num-bar"
            style={{ background: 'oklch(0.55 0.19 250)' }}
          />
        </div>
        <h2 className="sec-heading">
          things i built{' '}
          <span style={{ color: 'oklch(0.55 0.19 250)' }}>on my own time</span>
        </h2>
        <div className="projects-grid">
          {/* Featured — Nuzlocke Tracker */}
          <div className="project-featured">
            <div className="project-featured__header">
              <span>FEATURED</span>
              <span>LIVE</span>
            </div>
            <div className="project-featured__name">nuzlocke tracker</div>
            <p className="project-featured__desc">
              a run manager for pokemon players who make the game harder on
              purpose. 1,500+ users, 15,000+ page views. rules engine, encounter
              log, run history.
            </p>
            <div className="project-featured__tags">
              <span className="project-featured__tag">REACT</span>
              <span className="project-featured__tag">TYPESCRIPT</span>
              <span className="project-featured__tag">PYTHON</span>
              <span className="project-featured__tag">SUPABASE</span>
              <span className="project-featured__tag">FASTAPI</span>
            </div>
            <span style={{ flex: 1, minHeight: 14 }} />
            <a
              href="https://nuzlify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="project-featured__cta"
            >
              VIEW PROJECT ↗
            </a>
          </div>

          {/* Secondary stack */}
          <div className="project-stack">
            <a href="https://answermethis.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-card" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="project-card__header">
                <div className="project-card__name">answer me this</div>
                <span
                  className="project-card__status"
                  style={{ color: 'oklch(0.6 0.16 155)' }}
                >
                  LIVE ↗
                </span>
              </div>
              <p className="project-card__desc">
                browser-based party game in the vein of jackbox. players join
                from their phones with a room code.
              </p>
              <div className="project-card__tech">
                NEXT.JS / TYPESCRIPT / CONVEX
              </div>
            </a>

            <a href="https://devpost.com/software/carelink-9d1q5n" target="_blank" rel="noopener noreferrer" className="project-card" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="project-card__header">
                <div className="project-card__name">carelink</div>
                <span
                  className="project-card__status"
                  style={{ color: 'oklch(0.55 0.19 250)' }}
                >
                  2ND PLACE ↗
                </span>
              </div>
              <p className="project-card__desc">
                offline-first pwa for patient referrals in rural clinics. spark
                2026 hackathon, 47 teams.
              </p>
              <div className="project-card__tech">
                NEXT.JS / TYPESCRIPT / COUCHDB / GROQ API
              </div>
            </a>

            <div className="project-archived">
              <span className="project-archived__text">
                a few more experiments
              </span>
              <a
                href="https://github.com/chris-tela"
                target="_blank"
                rel="noopener noreferrer"
                className="project-archived__link"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOBBIES ───────────────────────────────────────── */}
      <section
        id="hobbies"
        className="sec"
        style={{
          '--band-color': 'oklch(0.6 0.2 28)',
          maxWidth: 1060,
        }}
      >
        <div className="band" />
        <div className="vlabel-wrap">
          <div className="vlabel">hobbies</div>
        </div>
        <div className="sec-num-row">
          <div className="sec-num">05 / HOBBIES</div>
          <div
            className="sec-num-bar"
            style={{ background: 'oklch(0.6 0.2 28)' }}
          />
        </div>
        <h2 className="sec-heading">off the clock</h2>
        <div className="hobbies-grid">
          {/* Sports */}
          <div
            className="hobby-card"
            style={{ boxShadow: '6px 6px 0 oklch(0.6 0.16 155)' }}
          >
            <div
              className="hobby-card__header"
              style={{ background: 'oklch(0.6 0.16 155)' }}
            >
              <span className="hobby-card__title">sports</span>
              <span className="hobby-card__subtitle">
                HOCKEY / HOOPS / FOOTBALL
              </span>
            </div>
            <div className="hobby-card__body">
              <div className="hobby-row" style={{ alignItems: 'center' }}>
                <span className="hobby-row__label">hockey</span>
                <img src="/flames.png" alt="Calgary Flames" className="team-logo" />
              </div>
              <div className="hobby-row" style={{ alignItems: 'center' }}>
                <span className="hobby-row__label">basketball</span>
                <img src="/raptors.png" alt="Toronto Raptors" className="team-logo" />
              </div>
              <div className="hobby-row" style={{ alignItems: 'center' }}>
                <span className="hobby-row__label">football</span>
                <img src="/falcons.png" alt="Atlanta Falcons" className="team-logo" />
              </div>
            </div>
          </div>

          {/* Anime */}
          <div
            className="hobby-card"
            style={{ boxShadow: '6px 6px 0 oklch(0.7 0.18 60)' }}
          >
            <div
              className="hobby-card__header"
              style={{
                background: 'oklch(0.7 0.18 60)',
                color: 'oklch(0.2 0.02 60)',
              }}
            >
              <span className="hobby-card__title">anime</span>
              <span className="hobby-card__subtitle">ONE EP A NIGHT</span>
            </div>
            <div className="anime-list">
              <div className="anime-row">
                <span className="anime-row__title">naruto</span>
                <span
                  className="anime-row__status"
                  style={{ color: 'oklch(0.6 0.16 155)' }}
                >
                  GOAT
                </span>
              </div>
              <div className="anime-row">
                <span className="anime-row__title">neon genesis evangelion</span>
                <span
                  className="anime-row__status"
                  style={{ color: 'oklch(0.55 0.16 55)' }}
                >
                  CLASSIC
                </span>
              </div>
              <div className="anime-row">
                <span className="anime-row__title">hunter x hunter</span>
                <span
                  className="anime-row__status"
                  style={{ color: 'oklch(0.55 0.19 250)' }}
                >
                  TOP TIER
                </span>
              </div>
              <div className="anime-row">
                <span className="anime-row__title">jujutsu kaisen</span>
                <span
                  className="anime-row__status"
                  style={{ color: 'oklch(0.6 0.2 28)' }}
                >
                  CURRENT
                </span>
              </div>
            </div>
          </div>

          {/* Pokemon */}
          <div className="pokemon-card">
            <div>
              <div className="pokemon-header">
                <span className="hobby-card__title">pokemon</span>
                <span className="hobby-card__subtitle">SINCE FOREVER</span>
              </div>
            </div>
            <div className="pokemon-tags">
              <span className="pokemon-tag">NUZLOCKES</span>
              <span className="pokemon-tag">BW2</span>
              <span className="pokemon-tag">SHOWDOWN</span>
              <span className="pokemon-tag">ANIME</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── LINKS ─────────────────────────────────────────── */}
      <section
        id="links"
        className="sec sec--links"
        style={{
          '--band-color': 'oklch(0.2 0.02 250)',
          maxWidth: 1000,
        }}
      >
        <div className="band" />
        <div className="vlabel-wrap">
          <div className="vlabel">say hi</div>
        </div>
        <div className="sec-num">06 / SAY HI</div>
        <h2 className="sec-heading">
          no pitch. just
          <br />
          the links.
        </h2>
        <div className="links-grid">
          <a
            href="https://github.com/chris-tela"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <span className="link-card__label">GITHUB</span>
            <span className="link-card__value">/chris-tela ↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/christopher-tela/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <span className="link-card__label">LINKEDIN</span>
            <span className="link-card__value">/in/christopher-tela ↗</span>
          </a>
          <a
            href="mailto:telachristopher4@gmail.com"
            className="link-card link-card--email"
          >
            <span className="link-card__label">EMAIL</span>
            <span className="link-card__value">
              telachristopher4@gmail.com
            </span>
          </a>
          <a
            href="/resume.pdf"
            download="Chris_Tela_Resume.pdf"
            className="link-card link-card--muted"
          >
            <span className="link-card__label">RESUME</span>
            <span className="link-card__value">pdf, if you must</span>
          </a>
        </div>
      </section>

      <Analytics />
    </div>
  );
}

export default App;
