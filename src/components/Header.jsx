export default function Header({ onHome }) {
  const nav = [
    ['Work', '#work'],
    ['Built', '#built'],
    ['Writing', '#writing'],
    ['Contact', '#contact'],
  ]
  return (
    <header className="bar">
      <a
        className="bar__name"
        href="/"
        onClick={(e) => {
          if (onHome) {
            e.preventDefault()
            onHome()
          }
        }}
      >
        <span className="bar__dot" aria-hidden="true" />
        Namkhang Le
      </a>
      {(
        <nav aria-label="Sections" className="bar__nav">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={e => {
              if (onHome) { e.preventDefault(); onHome(href) }
            }}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  )
}
