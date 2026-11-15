import { posts, formatDate } from '../data/posts.js'

// Turn [text](https://url) into links.
function inline(text) {
  const out = []
  const re = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  let last = 0
  let m
  let k = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <a key={k++} href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Block({ b }) {
  if (b.type === 'h2') return <h2>{inline(b.text)}</h2>
  if (b.type === 'quote') return <blockquote>{inline(b.text)}</blockquote>
  if (b.type === 'code')
    return (
      <pre>
        {b.language && <span className="label">{b.language}</span>}
        <code>{b.text}</code>
      </pre>
    )
  return <p>{inline(b.text)}</p>
}

export default function Post({ id, onBack, onOpen }) {
  const post = posts.find((p) => p.id === id)
  const others = [...posts].sort((a, b) => b.date.localeCompare(a.date)).filter((p) => p.id !== id)
  return (
    <article className="post">
      <button type="button" className="link link--btn" onClick={onBack}>All writing</button>
      <p className="label">{formatDate(post.date)} / {post.tags.join(' / ')}</p>
      <h1>{post.title}</h1>
      <div className="post__body">
        {post.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>
      {others.length > 0 && (
        <nav className="more" aria-label="More writing">
          <p className="label">More writing</p>
          <ul>
            {others.map((p) => (
              <li key={p.id}>
                <a
                  href={`?post=${p.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onOpen(p.id)
                  }}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  )
}
