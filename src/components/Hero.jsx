import { links, stack } from '../data/meta.js'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="label">Software engineer / NYC</p>
        <h1 id="hero-title">
          I build <em>agentic AI</em> systems and ship things at hackathons.
        </h1>
        <p className="lede">
          Software Engineer II at <a href="https://about.meta.com/" target="_blank" rel="noopener noreferrer">Meta</a>,
          working on LLMs and generative AI. Georgia Tech grad with a focus in
          artificial intelligence and computer networking.
        </p>
        <div className="actions">
          <a className="btn btn--solid" href={links.resume} target="_blank" rel="noopener noreferrer">Resume (PDF)</a>
          <a className="btn" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <aside className="hero__card" aria-label="Quick facts">
        <div className="frame">
          <img src="/pfp.png" alt="Portrait of Namkhang Le" width="638" height="630" />
          <span className="frame__tick frame__tick--tl" aria-hidden="true" />
          <span className="frame__tick frame__tick--br" aria-hidden="true" />
        </div>
        <dl className="facts">
          <div><dt>Now</dt><dd>Meta, agentic AI infrastructure</dd></div>
          <div><dt>Before</dt><dd>AWS, Lockheed Martin, Citi</dd></div>
          <div><dt>School</dt><dd>Georgia Tech</dd></div>
          <div><dt>Tools</dt><dd>{stack.join(', ')}</dd></div>
        </dl>
      </aside>
    </section>
  )
}
