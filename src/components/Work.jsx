import { useState } from 'react'
import { experience } from '../data/experience.js'

export default function Work() {
  const [open, setOpen] = useState(experience[0].id)
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <header className="section__head">
        <span className="label">01</span>
        <h2 id="work-title">Work</h2>
      </header>
      <ol className="roles">
        {experience.map((r) => {
          const isOpen = open === r.id
          return (
            <li key={r.id} className={`role ${isOpen ? 'is-open' : ''}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`role-${r.id}`}
                  onClick={() => setOpen(isOpen ? null : r.id)}
                >
                  <span className="role__co">{r.company}</span>
                  <span className="role__title">{r.title}</span>
                  <span className="role__when">{r.period}</span>
                  <span className="role__plus" aria-hidden="true">{isOpen ? '-' : '+'}</span>
                </button>
              </h3>
              <div id={`role-${r.id}`} className="role__body" hidden={!isOpen}>
                <p className="label">{r.location}</p>
                <ul>
                  {r.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="chips">
                  {r.skills.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </p>
                <a className="link" href={r.url} target="_blank" rel="noopener noreferrer">{r.company} website</a>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
