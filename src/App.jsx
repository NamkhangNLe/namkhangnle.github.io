import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import Projects from './components/Projects.jsx'
import Writing from './components/Writing.jsx'
import Post from './components/Post.jsx'
import Contact from './components/Contact.jsx'
import { posts } from './data/posts.js'

function readPostId() {
  const id = new URLSearchParams(window.location.search).get('post')
  return posts.some((p) => p.id === id) ? id : null
}

export default function App() {
  const [postId, setPostId] = useState(readPostId)

  useEffect(() => {
    const onPop = () => setPostId(readPostId())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const post = posts.find((p) => p.id === postId)
    document.title = post ? `${post.title} - Namkhang Le` : 'Namkhang Le'
  }, [postId])

  const open = (id, hash = '') => {
    window.history.pushState(null, '', id ? `?post=${id}` : window.location.pathname + hash)
    setPostId(id)
    requestAnimationFrame(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView()
      else window.scrollTo(0, 0)
    })
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header onHome={postId ? hash => open(null, hash) : null} />
      <main id="main">
        {postId ? (
          <Post id={postId} onBack={() => open(null)} onOpen={open} />
        ) : (
          <>
            <Hero />
            <Work />
            <Projects />
            <Writing onOpen={open} />
            <Contact />
          </>
        )}
      </main>
      <footer className="foot">
        <span>Namkhang Le</span>
        <span>Built with React and Vite.</span>
      </footer>
    </>
  )
}
