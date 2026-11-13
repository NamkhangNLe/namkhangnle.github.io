import { links } from '../data/meta.js'

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <header className="section__head">
        <span className="label">04</span>
        <h2 id="contact-title">Contact</h2>
      </header>
      <p className="contact__big">
        <a href={links.email}>NamkhangNLe@hotmail.com</a>
      </p>
      <p className="actions">
        <a className="btn" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a className="btn" href={links.resume} target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
      </p>
    </section>
  )
}
