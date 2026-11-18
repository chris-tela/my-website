// The plain, recruiter-friendly version of the site, served at /portfolio.
import React, { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { JOBS, PROJECTS } from './town/Sections';
import westernLogo from './assets/images/western_university.png';
import './pro.css';

const EMAIL = 'telachristopher4@gmail.com';
const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christopher-tela/' },
  { label: 'GitHub', href: 'https://github.com/chris-tela' },
  { label: 'Resume (PDF)', href: '/resume.pdf' },
];
const SKILLS = [
  [
    'Languages',
    'Python, TypeScript, JavaScript, Java, C#, C, SQL, Bash, PowerShell, HTML/CSS',
  ],
  [
    'Backend and databases',
    'Node.js, FastAPI, Flask, PostgreSQL, MySQL, MongoDB, Supabase, Convex, CouchDB',
  ],
  [
    'Frameworks and libraries',
    'React, Next.js, Playwright, xUnit, JUnit, Pandas, NumPy, Scikit-learn, Matplotlib, BeautifulSoup, shadcn/ui',
  ],
  [
    'Tools and platforms',
    'Git, GitHub, Docker, Kubernetes, Linux/Unix, Jenkins, Proxmox, Azure, Google Cloud, Postman, Jira, Confluence, Power BI, Vercel, Claude Code, Codex, MS Office',
  ],
];

// Shows public/headshot.jpg, or initials until that file exists.
function Headshot() {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="pro-photo pro-photo--initials" aria-hidden="true">
        CT
      </div>
    );
  }
  return (
    <img
      className="pro-photo"
      src="/headshot.jpg"
      alt="Christopher Tela"
      onError={() => setFailed(true)}
    />
  );
}

const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function initialDark() {
  try {
    const saved = localStorage.getItem('pro-theme');
    if (saved) return saved === 'dark';
  } catch (e) {
    // storage blocked; fall back to the system setting
  }
  return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

export default function ProPage() {
  const [dark, setDark] = useState(initialDark);

  useEffect(() => {
    document.body.classList.toggle('pro-dark', dark);
    try {
      localStorage.setItem('pro-theme', dark ? 'dark' : 'light');
    } catch (e) {
      // not saved; the toggle still works for this visit
    }
  }, [dark]);

  return (
    <div className="pro">
      <div className="pro-bar">
        <a className="pro-btn" href="/">
          ← Back to Tela Town
        </a>
        <button
          type="button"
          className="pro-btn"
          aria-pressed={dark}
          onClick={() => setDark((d) => !d)}
        >
          {dark ? '☀ Light mode' : '☾ Night mode'}
        </button>
      </div>
      <header className="pro-hero">
        <Headshot />
        <div>
          <h1>Christopher Tela</h1>
          <p className="pro-tagline">
            Computer Science student at Western University, focused on
            full-stack development, test automation, backend systems and AI/ML.
          </p>
          <p className="pro-status">
            Seeking internships for Winter and Summer 2027
          </p>
          <nav className="pro-links" aria-label="Contact links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            {LINKS.map((l) => (
              <Ext key={l.label} href={l.href}>
                {l.label}
              </Ext>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section>
          <h2>Experience</h2>
          <ul className="pro-list">
            {JOBS.map((j) => (
              <li key={j.company} className="pro-item">
                <img src={j.logo} alt="" className="pro-logo" />
                <div>
                  <div className="pro-item__head">
                    <h3>{j.role}</h3>
                    <span className="pro-dates">{j.dates}</span>
                  </div>
                  <p className="pro-org">{j.company}</p>
                  <p>{j.text}</p>
                  {j.tech && <p className="pro-tech">{j.tech}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Projects</h2>
          <ul className="pro-grid">
            {PROJECTS.map((p) => (
              <li key={p.name} className="pro-card">
                <h3>{p.name}</h3>
                <p className="pro-org">{p.note}</p>
                <p>{p.text}</p>
                <p className="pro-tech">{p.tech}</p>
                <Ext href={p.href}>View project</Ext>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          <div className="pro-item">
            <img src={westernLogo} alt="" className="pro-logo" />
            <div>
              <h3>Bachelor of Science, Computer Science</h3>
              <p className="pro-org">Western University, London, Ontario</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Skills</h2>
          <dl className="pro-skills">
            {SKILLS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="pro-footer">
        <a href="/">Want something more fun? Explore the interactive Tela Town version</a>
      </footer>
      <Analytics />
    </div>
  );
}
