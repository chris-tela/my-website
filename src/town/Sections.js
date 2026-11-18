// What each building says. Used by the door panels and by "See everything".
import React from 'react';
import rbcLogo from '../assets/images/rbc.png';
import trojanLogo from '../assets/images/trojantechnologies.png';
import riipenLogo from '../assets/images/riipen.svg';
import wdsLogo from '../assets/images/western_dev_society_logo.jpg';
import tethosLogo from '../assets/images/techforsocialimpact_logo.jpg';

const Ext = ({ href, children, className }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
  </a>
);

export const JOBS = [
  {
    logo: rbcLogo,
    role: 'Automation engineer intern',
    company: 'RBC (Royal Bank of Canada)',
    dates: 'Summer 2026, 4 months',
    text: 'Built API validation and end-to-end test suites for consumer credit card flows. Engineered an AI pipeline that generates test cases from Jira stories and publishes docs to Confluence.',
    tech: 'Playwright, TypeScript, Python',
  },
  {
    logo: trojanLogo,
    role: 'Software developer and QA intern',
    company: 'Trojan Technologies',
    dates: 'May 2025 to May 2026, 12 months',
    text: 'Built test automation frameworks and CI/CD pipelines for hardware product validation.',
    tech: 'C#, Jenkins, xUnit, Proxmox',
  },
  {
    logo: riipenLogo,
    role: 'Web developer',
    company: 'Riipen',
    dates: 'January to March 2026',
    text: 'Built web solutions for an education platform connecting students with international universities.',
  },
  {
    logo: wdsLogo,
    role: 'Full-stack engineer',
    company: 'Western Developers Society',
    dates: 'September 2024 to April 2025',
    text: 'Developed a council management app that automates speaking order, attendance and voting.',
  },
  {
    logo: tethosLogo,
    role: 'Software developer',
    company: 'Tethos Association',
    dates: 'September 2024 to April 2025',
    text: 'Integrated real-time APIs and built PostgreSQL schemas for a social services accessibility app.',
  },
];

export const PROJECTS = [
  {
    name: 'Nuzlocke Tracker',
    note: 'Live, 3,200+ users',
    text: 'A run manager for Pokemon players who make the game harder on purpose. Rules engine, encounter log and run history.',
    tech: 'React, TypeScript, Python, Supabase, FastAPI',
    href: 'https://nuzlify.com',
    cta: 'Open Nuzlocke Tracker',
  },
  {
    name: 'Answer Me This',
    note: 'Live',
    text: 'A browser party game in the vein of Jackbox. Players join from their phones with a room code.',
    tech: 'Next.js, TypeScript, Convex',
    href: 'https://answermethis.vercel.app/',
    cta: 'Play Answer Me This',
  },
  {
    name: 'CareLink',
    note: '2nd place of 47 teams, Spark 2026 hackathon',
    text: 'An offline-first PWA for patient referrals in rural clinics.',
    tech: 'Next.js, TypeScript, CouchDB, Groq API',
    href: 'https://devpost.com/software/carelink-9d1q5n',
    cta: 'Read about CareLink on Devpost',
  },
];

function About() {
  return (
    <>
      <p>
        Hi, I'm Chris Tela. I'm a third-year computer science student at
        Western University.
      </p>
      <p>
        I'm looking for internships for winter and summer 2027. I like
        full-stack work, QA and test automation, backend systems and AI/ML.
      </p>
    </>
  );
}

function Work() {
  return (
    <ul className="entries">
      {JOBS.map((j) => (
        <li key={j.company} className="entry entry--logo">
          <img src={j.logo} alt="" className="entry__logo" />
          <div>
            <h3>{j.role}</h3>
            <p className="entry__meta">
              {j.company}
              <br />
              {j.dates}
            </p>
            <p>{j.text}</p>
            {j.tech && <p className="entry__tech">Built with {j.tech}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  return (
    <>
      <ul className="entries">
        {PROJECTS.map((p) => (
          <li key={p.name} className="entry">
            <h3>{p.name}</h3>
            <p className="entry__meta">{p.note}</p>
            <p>{p.text}</p>
            <p className="entry__tech">Built with {p.tech}</p>
            <p>
              <Ext href={p.href}>{p.cta}</Ext>
            </p>
          </li>
        ))}
      </ul>
      <p>
        A few more experiments are on{' '}
        <Ext href="https://github.com/chris-tela">GitHub</Ext>.
      </p>
    </>
  );
}

function Resume() {
  return (
    <>
      <p>My full resume as a PDF.</p>
      <p className="actions">
        <Ext href="/resume.pdf" className="btn">
          View resume
        </Ext>
        <a href="/resume.pdf" download="Chris_Tela_Resume.pdf" className="btn btn--quiet">
          Download resume
        </a>
      </p>
    </>
  );
}

function Hobbies() {
  return (
    <>
      <h3>Sports</h3>
      <ul className="teams">
        <li>
          <img src="/flames.png" alt="" /> Hockey: Calgary Flames
        </li>
        <li>
          <img src="/raptors.png" alt="" /> Basketball: Toronto Raptors
        </li>
        <li>
          <img src="/falcons.png" alt="" /> Football: Atlanta Falcons
        </li>
      </ul>
      <h3>Other things I love</h3>
      <ul>
        <li>Anime</li>
        <li>Pokemon</li>
        <li>Hiking</li>
        <li>Eating out</li>
        <li>Hanging out with my dog</li>
        <li>Listening to music</li>
        <li>Playing video games</li>
      </ul>
    </>
  );
}

function Contact() {
  return (
    <ul className="links">
      <li>
        <span>Email</span>
        <a href="mailto:telachristopher4@gmail.com">telachristopher4@gmail.com</a>
      </li>
      <li>
        <span>LinkedIn</span>
        <Ext href="https://www.linkedin.com/in/christopher-tela/">
          linkedin.com/in/christopher-tela
        </Ext>
      </li>
      <li>
        <span>GitHub</span>
        <Ext href="https://github.com/chris-tela">github.com/chris-tela</Ext>
      </li>
    </ul>
  );
}

export function Credits() {
  return (
    <>
      <p>
        Buildings, trees, grass, flowers and signs are from the Pewter City
        tileset by{' '}
        <Ext href="https://www.deviantart.com/ditto209">ditto209</Ext>. The
        stone road is from Path Tiles EX by{' '}
        <Ext href="https://www.deviantart.com/j-treecko252">J-Treecko252</Ext>.
        Both are fan-made Gen 3 style tilesets shared for public use with
        credit.
      </p>
      <p>The character and menus were drawn for this site.</p>
    </>
  );
}

// Order here is the reading order of "See everything".
export const SECTIONS = [
  { id: 'about', title: 'About me', Body: About },
  { id: 'work', title: 'Work', Body: Work },
  { id: 'projects', title: 'Projects', Body: Projects },
  { id: 'resume', title: 'Resume', Body: Resume },
  { id: 'hobbies', title: 'Hobbies', Body: Hobbies },
  { id: 'contact', title: 'Contact', Body: Contact },
];
