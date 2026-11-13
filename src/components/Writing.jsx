import { useMemo, useState } from 'react'
import { posts, formatDate } from '../data/posts.js'

export default function Writing({ onOpen }) {
  const [q, setQ] = useState('')
  const sorted = useMemo(() => [...posts].sort((a, b) => b.date.localeCompare(a.date)), [])
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return sorted
    return sorted.filter(
      (p) =>
        p.title.toLowerCase().includes(t) ||
        p.excerpt.toLowerCase().includes(t) ||
        p.tags.some((x) => x.toLowerCase().includes(t)) ||
        p.blocks.some((b) => b.text.toLowerCase().includes(t)),
    )
  }, [q, sorted])

  return (
    <section id="writing" className="section" aria-labelledby="writing-title">
      <header className="section__head">
        <span className="label">03</span>
        <h2 id="writing-title">Writing</h2>
        <label className="search">
          <span className="sr">Search posts</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts" />
        </label>
      </header>
      <ul className="posts">
        {shown.map((p) => (
          <li key={p.id}>
            <a
              href={`?post=${p.id}`}
              onClick={(e) => {
                e.preventDefault()
                onOpen(p.id)
              }}
            >
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span className="posts__title">{p.title}</span>
              <span className="posts__excerpt">{p.excerpt}</span>
              <span className="posts__tags">{p.tags.join(' / ')}</span>
            </a>
          </li>
        ))}
        {shown.length === 0 && <li className="empty">No posts match &quot;{q}&quot;.</li>}
      </ul>
    </section>
  )
}
