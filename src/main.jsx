import { ArrowUpRight, Github, Linkedin, Mail, Moon, Sparkles, Sun, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const writing = [
  {
    title: 'Building in public, one small idea at a time',
    description: 'Notes on learning in the open, shipping experiments, and making the web a little more human.',
    meta: 'thoughts · 04 min read',
  },
  {
    title: 'The joy of making interfaces feel obvious',
    description: 'A short reflection on the details that turn a functional product into a memorable one.',
    meta: 'design · 06 min read',
  },
  {
    title: 'What I’m learning from the React ecosystem',
    description: 'A practical list of tools, patterns, and questions currently shaping my work.',
    meta: 'engineering · 08 min read',
  },
]

const projects = [
  {
    number: '01',
    title: 'Thoughtful interfaces',
    detail: 'React · Frontend · Design systems',
    description: 'Exploring how clear layouts, expressive type, and reusable components can make digital products feel effortless.',
    color: 'lavender',
  },
  {
    number: '02',
    title: 'Useful experiments',
    detail: 'JavaScript · APIs · Prototyping',
    description: 'Small, focused experiments that turn curious questions into practical tools and playful prototypes.',
    color: 'peach',
  },
  {
    number: '03',
    title: 'Open-source energy',
    detail: 'Collaboration · Learning · Community',
    description: 'Learning in public, sharing what works, and contributing to the communities that make the web better.',
    color: 'blue',
  },
]

const heroPhrases = [
  { text: 'feel simple.', color: 'purple' },
  { text: 'feel human.', color: 'peach' },
  { text: 'feel thoughtful.', color: 'blue' },
  { text: 'feel playful.', color: 'green' },
]

function TypingPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleText(heroPhrases[phraseIndex].text)
      return undefined
    }

    let timeoutId
    let characterIndex = 0
    let deleting = false

    const tick = () => {
      const phrase = heroPhrases[phraseIndex].text
      characterIndex = deleting ? characterIndex - 1 : characterIndex + 1
      setVisibleText(phrase.slice(0, characterIndex))

      if (!deleting && characterIndex === phrase.length) {
        deleting = true
        timeoutId = window.setTimeout(tick, 1800)
        return
      }

      if (deleting && characterIndex === 0) {
        deleting = false
        setPhraseIndex((current) => (current + 1) % heroPhrases.length)
        timeoutId = window.setTimeout(tick, 300)
        return
      }

      timeoutId = window.setTimeout(tick, deleting ? 55 : 95)
    }

    timeoutId = window.setTimeout(tick, 500)
    return () => window.clearTimeout(timeoutId)
  }, [phraseIndex])

  return <span className={`typing-phrase typing-phrase-${heroPhrases[phraseIndex].color}`} aria-live="polite">{visibleText}</span>
}

function XIcon() {
  return (
    <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h4.7l3.3 4.7L17.3 4H20l-5.8 6.7L20 20h-4.7l-3.7-5.2L7.1 20H4.4l6-6.9L5 4Zm3.1 1.8 7.9 12.4h1.3L9.4 5.8H8.1Z" />
    </svg>
  )
}

function App() {
  const [dark, setDark] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    if (!selectedProject) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  return (
    <div className={`site ${dark ? 'dark' : 'light'}`}>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="topbar">
        <a className="logo" href="#top" aria-label="Sasanka Akash home">sa<span>.</span></a>
        <nav aria-label="Primary navigation">
          <a href="#about">about</a>
          <a href="#work">work</a>
          <a href="#writing">writing</a>
        </nav>
        <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>
          {dark
            ? <Moon key="moon" className="theme-icon" size={17} strokeWidth={1.7} />
            : <Sun key="sun" className="theme-icon" size={17} strokeWidth={1.7} />}
        </button>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="profile-image-wrap">
            <img className="profile-image" src="/profile-image.png" alt="Sasanka's illustrated profile portrait" />
          </div>
          <p className="eyebrow">hello, i’m sasanka <span className="wave" role="img" aria-label="rock on">🤘</span></p>
          <h1>I make things<br /><em><TypingPhrase /></em></h1>
          <p className="hero-copy">Developer, designer, and curious builder turning ideas into thoughtful digital experiences with React and a little bit of magic.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="mailto:sasankaakash.dev@gmail.com">let’s talk <ArrowUpRight size={16} /></a>
            <a className="text-link" href="#work">see my work <span>↓</span></a>
          </div>
        </section>

        <section className="intro section-rule" id="about">
          <div className="section-label">01 / background</div>
          <div className="intro-content">
            <p className="lead">I’m Sasanka — a developer who cares about the space where <span className="accent">good ideas</span>, clear code, and human experiences meet.</p>
            <p>I enjoy building on the web, learning out loud, and helping ambitious ideas find their shape. When I’m not at my desk, you’ll probably find me collecting references, tinkering with a new side project, or asking too many questions.</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/sasanka-akash/" target="_blank" rel="noreferrer"><Linkedin size={15} /> linkedin <ArrowUpRight size={13} /></a>
              <a href="https://x.com/SasankaAE" target="_blank" rel="noreferrer"><XIcon /> x / twitter <ArrowUpRight size={13} /></a>
              <a href="mailto:sasankaakash.dev@gmail.com"><Mail size={15} /> email <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </section>

        <section className="work section-rule" id="work">
          <div className="section-label">02 / selected work</div>
          <div className="work-content">
            <div className="section-heading">
              <h2>Things I’ve<br /><em>made & learned.</em></h2>
              <p>A few directions I keep coming back to — from polished interfaces to useful little experiments.</p>
            </div>
            <div className="project-list">
              {projects.map((project) => (
                <button className="project" key={project.number} type="button" onClick={() => setSelectedProject(project)} aria-label={`Preview ${project.title}`}>
                  <div className={`project-art ${project.color}`}><Sparkles size={22} strokeWidth={1.3} /></div>
                  <div className="project-copy"><span className="project-number">{project.number}</span><h3>{project.title}</h3><p>{project.detail}</p></div>
                  <ArrowUpRight className="project-arrow" size={20} strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="writing section-rule" id="writing">
          <div className="section-label">03 / writing</div>
          <div className="writing-content">
            <div className="section-heading"><h2>Notes from<br /><em>the process.</em></h2><a className="text-link" href="https://x.com/SasankaAE" target="_blank" rel="noreferrer">follow along <ArrowUpRight size={14} /></a></div>
            <div className="writing-list">
              {writing.map((post, index) => (
                <a className="post" href="https://x.com/SasankaAE" target="_blank" rel="noreferrer" key={post.title}>
                  <span className="post-index">0{index + 1}</span><div><h3>{post.title} <ArrowUpRight size={15} /></h3><p>{post.description}</p><span className="post-meta">{post.meta}</span></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div><span className="footer-mark">sa.</span><p>Made with care, curiosity,<br />and too much coffee.</p></div>
        <div className="footer-right"><span>© 2026 Sasanka Akash</span><a href="#top">back to top ↑</a><a href="https://github.com/SasankaAE" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={16} /></a></div>
      </footer>

      {selectedProject && (
        <div className="preview-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <section className="project-preview" role="dialog" aria-modal="true" aria-labelledby="preview-title" onClick={(event) => event.stopPropagation()}>
            <button className="preview-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project preview">
              <X size={18} />
            </button>
            <div className={`preview-art project-art ${selectedProject.color}`}><Sparkles size={32} strokeWidth={1.2} /></div>
            <span className="project-number">{selectedProject.number} / selected work</span>
            <h2 id="preview-title">{selectedProject.title}</h2>
            <p className="preview-detail">{selectedProject.detail}</p>
            <p className="preview-description">{selectedProject.description}</p>
          </section>
        </div>
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)