import { useState } from 'react'
import { projectData } from '../data/projects.js'
import { categories } from '../data/meta.js'

const items = Object.entries(projectData).map(([id, p]) => ({ id, ...p, category: categories[id] }))
const filters = ['All', ...new Set(items.map((i) => i.category))]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const shown = items.filter((i) => filter === 'All' || i.category === filter)
  return (
    <section id="built" className="section" aria-labelledby="built-title">
      <header className="section__head">
        <span className="label">02</span>
        <h2 id="built-title">Built</h2>
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f}
            </button>
          ))}
        </div>
      </header>
      <ul className="cards">
        {shown.map((p, i) => (
          <li key={p.id} className="card">
            <p className="label">
              <span>{String(i + 1).padStart(2, '0')}</span> {p.category} / {p.date}
            </p>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <a className="link" href={p.link} target="_blank" rel="noopener noreferrer">
              {p.linkText}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
                                                                                               }
