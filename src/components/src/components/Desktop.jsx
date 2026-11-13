import { useEffect, useRef, useState } from 'react'
import { projectData } from '../data/projects.js'
import { categories, links } from '../data/meta.js'
import { posts } from '../data/posts.js'
import Work from './Work.jsx'
import Writing from './Writing.jsx'
import Post from './Post.jsx'
import './desktop.css'

const APPS = [
  { id: 'messages', name: 'Messages', glyph: '↗', color: '#b7e4c5', note: 'Start a conversation' },
  { id: 'finder', name: 'Finder', glyph: '▱', color: '#accdf8', note: 'Things I have built' },
  { id: 'work', name: 'Work', glyph: '▤', color: '#f5d695', note: 'The work so far' },
  { id: 'writing', name: 'Writing', glyph: '≋', color: '#e8bed6', note: 'Notes, not notifications' },
]
const intro = [
  "Hi! I'm Namkhang Le. Welcome to my desktop.",
  "I'm a software engineer at Meta in NYC, working on LLMs and generative AI. Before that: AWS, Lockheed Martin and Citi.",
  "Georgia Tech grad. Builder at hackathons. This is a small computer for exploring what I've made, what I've learned, and what comes next.",
]
function initialPost() {
  const id = new URLSearchParams(location.search).get('post')
  return posts.some(p => p.id === id) ? id : null
}

function Messages() {
  const [shown, setShown] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches ? intro.length : 1)
  const [draft, setDraft] = useState('')
  useEffect(() => {
    if (shown >= intro.length) return
    const timer = setTimeout(() => setShown(n => n + 1), 1250)
    return () => clearTimeout(timer)
  }, [shown])
  return <div className="os-messages">
    <header className="os-chat-person"><img src="/pfp.png" width="44" height="44" alt="Namkhang Le" /><div><strong>Namkhang Le</strong><span>NYC / Meta / Georgia Tech</span></div></header>
    <div className="os-chat-thread" aria-live="polite" aria-relevant="additions">
      <p className="os-caption">A prerecorded introduction. Not a live chat.</p>
      {intro.slice(0, shown).map(text => <p className="os-bubble" key={text}>{text}</p>)}
      {shown < intro.length && <div className="os-typing" aria-label="Introduction continues">● ● ●</div>}
      {shown < intro.length && <button className="os-inline" onClick={() => setShown(intro.length)}>Show the full introduction</button>}
    </div>
    <form className="os-compose" onSubmit={e => { e.preventDefault(); location.href = `${links.email}?subject=${encodeURIComponent('Hello from your desktop')}&body=${encodeURIComponent(draft)}` }}>
      <label htmlFor="message-draft">Write an email to Namkhang</label>
      <div><input id="message-draft" value={draft} onChange={e => setDraft(e.target.value)} placeholder="What are you working on?" /><button type="submit" disabled={!draft.trim()}>Draft email ↗</button></div>
      <small>Opens your email app. You review and send it there.</small>
    </form>
  </div>
}
function Finder() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState('bobalabs')
  const all = Object.entries(projectData)
  const shown = all.filter(([id]) => category === 'All' || categories[id] === category)
  const detail = projectData[selected]
  return <div className="os-finder">
    <aside aria-label="Project folders"><p className="os-caption">FAVORITES</p>{['All', ...new Set(Object.values(categories))].map(c => <button key={c} aria-pressed={category === c} onClick={() => { setCategory(c); setSelected(all.find(([id]) => c === 'All' || categories[id] === c)[0]) }}><span aria-hidden="true">▱</span>{c}</button>)}<a href={links.resume} target="_blank" rel="noopener noreferrer">↓ Resume.pdf</a></aside>
    <div className="os-finder-main"><div className="os-folder-path">Namkhang / Projects / {category}<span>{shown.length} {shown.length === 1 ? 'item' : 'items'}</span></div>
      <div className="os-file-grid" aria-label="Projects">{shown.map(([id,p]) => <button key={id} aria-pressed={selected === id} onClick={() => setSelected(id)}><span className="os-folder" aria-hidden="true">▱</span><strong>{p.title}</strong><small>{categories[id]} / {p.date}</small></button>)}</div>
      <section className="os-file-preview" aria-live="polite"><p className="os-caption">QUICK LOOK / {categories[selected]}</p><h2>{detail.title}</h2><p>{detail.description}</p><a href={detail.link} target="_blank" rel="noopener noreferrer">{detail.linkText} ↗</a></section>
    </div>
  </div>
}

export default function Desktop() {
  const [postId, setPostId] = useState(initialPost)
  const [windows, setWindows] = useState(() => [{ id: initialPost() ? 'writing' : 'messages', x: 11, y: 6, minimized: false, full: false }])
  const [active, setActive] = useState(() => initialPost() ? 'writing' : 'messages')
  const [now, setNow] = useState(new Date())
  const drag = useRef(null)
  const stage = useRef(null)
  const launcher = useRef({})
  const activate = id => {
    setWindows(ws => { const existing = ws.find(w => w.id === id); return [...ws.filter(w => w.id !== id), existing ? { ...existing, minimized: false } : { id, x: 6 + ws.length * 3, y: 4 + ws.length * 3, minimized: false, full: false }] })
    setActive(id)
  }
  const update = (id, patch) => setWindows(ws => ws.map(w => w.id === id ? { ...w, ...patch } : w))
  const nextActive = id => [...windows].reverse().find(w => w.id !== id && !w.minimized)?.id || null
  const close = id => { setWindows(ws => ws.filter(w => w.id !== id)); setActive(nextActive(id)); launcher.current[id]?.focus() }
  const openPost = id => {
    history.pushState(null, '', id ? `?post=${encodeURIComponent(id)}` : location.pathname)
    setPostId(id)
    activate('writing')
  }
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000)
    const back = () => { const id = initialPost(); setPostId(id); if (id) { setActive('writing'); setWindows(ws => [...ws.filter(w => w.id !== 'writing'), { id: 'writing', x: 8, y: 4, minimized: false, full: false }]) } }
    window.addEventListener('popstate', back)
    return () => { clearInterval(timer); window.removeEventListener('popstate', back) }
  }, [])
  const focusWindow = id => { setActive(id); setWindows(ws => [...ws.filter(w => w.id !== id), ...ws.filter(w => w.id === id)]) }
  const move = e => {
    if (!drag.current || !stage.current) return
    const d = drag.current, r = stage.current.getBoundingClientRect()
    update(d.id, { x: Math.max(0, Math.min(100 - Math.min(780, r.width * .76) / r.width * 100, d.x + (e.clientX - d.px) / r.width * 100)), y: Math.max(0, Math.min(100 - Math.min(600, r.height * .83) / r.height * 100, d.y + (e.clientY - d.py) / r.height * 100)) })
  }
  return <div className="os-shell">
    <a className="skip" href="#desktop-apps">Skip to apps</a>
    <header className="os-menubar"><span className="os-mark" aria-hidden="true">n.</span><strong>Namkhang's computer</strong><span className="os-current">{APPS.find(a => a.id === active)?.name || 'Desktop'}</span><span className="os-menubar-spacer" /><span className="os-local">NYC</span><time dateTime={now.toISOString()}>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time></header>
    <main className="os-stage" ref={stage} aria-label="Personal desktop">
      <div className="os-wallpaper" aria-hidden="true"><div className="os-orb os-orb-one" /><div className="os-orb os-orb-two" /><div className="os-wallpaper-lines" /><div className="os-wallpaper-type">Make<br /><i>yourself</i><br />at home.</div></div>
      <div className="os-desktop-files"><a href={links.resume} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">▤</span>Resume.pdf</a><a href={links.github} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">⌘</span>GitHub ↗</a></div>
      {windows.map((w,z) => { const app = APPS.find(a => a.id === w.id); return <section key={w.id} role="region" aria-label={`${app.name} window`} hidden={w.minimized} data-active={active === w.id} data-app={w.id} className={`os-window ${w.full ? 'os-window-full' : ''}`} style={{ left: `${w.x}%`, top: `${w.y}%`, zIndex: z + 2 }} onPointerDown={() => focusWindow(w.id)}>
        <header className="os-titlebar"><div className="os-traffic"><button aria-label={`Close ${app.name}`} onClick={() => close(w.id)}>×</button><button aria-label={`Minimize ${app.name}`} onClick={() => { update(w.id, { minimized: true }); setActive(nextActive(w.id)); launcher.current[w.id]?.focus() }}>−</button><button aria-label={`${w.full ? 'Restore' : 'Maximize'} ${app.name}`} onClick={() => update(w.id, { full: !w.full })}>↗</button></div>
          <button className="os-drag-handle" aria-label={`Move ${app.name} window. Use arrow keys to move, or drag.`} onPointerDown={e => { if (w.full || matchMedia('(max-width: 700px)').matches) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { id: w.id, x: w.x, y: w.y, px: e.clientX, py: e.clientY } }} onPointerMove={move} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }} onKeyDown={e => { const keys = { ArrowLeft: [-2,0], ArrowRight: [2,0], ArrowUp: [0,-2], ArrowDown: [0,2] }; if (keys[e.key]) { e.preventDefault(); const [x,y] = keys[e.key]; const r = stage.current.getBoundingClientRect(); update(w.id, { x: Math.max(0,Math.min(100-Math.min(780,r.width*.76)/r.width*100,w.x+x)), y: Math.max(0,Math.min(100-Math.min(600,r.height*.83)/r.height*100,w.y+y)) }) } }}>{app.name}</button><span className="os-title-extra">{w.id === 'messages' ? 'Introduction' : 'Personal files'}</span></header>
        <div className="os-window-content">{w.id === 'messages' ? <Messages /> : w.id === 'finder' ? <Finder /> : w.id === 'work' ? <Work /> : postId ? <Post key={postId} id={postId} onBack={() => openPost(null)} onOpen={openPost} /> : <Writing onOpen={openPost} />}</div>
      </section> })}
      {!windows.some(w => !w.minimized) && <div className="os-empty"><p>Your desktop, at your pace.</p><button onClick={() => activate('messages')}>Open Messages ↗</button></div>}
    </main>
    <nav id="desktop-apps" className="os-dock" aria-label="Desktop apps">{APPS.map(app => <button key={app.id} ref={e => { launcher.current[app.id] = e }} onClick={() => activate(app.id)} aria-pressed={active === app.id} aria-label={`Open ${app.name}`}><span className="os-app-icon" style={{ '--app-color': app.color }} aria-hidden="true">{app.glyph}</span><span className="os-app-name">{app.name}</span><span className={`os-running ${windows.some(w => w.id === app.id) ? 'is-running' : ''}`} aria-hidden="true" /></button>)}</nav>
    <footer className="os-footnote">A personal website, disguised as a computer. Windows stay in this session.</footer>
  </div>
}
