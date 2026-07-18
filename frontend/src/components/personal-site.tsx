"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const currentProjects = [
  {
    number: "01",
    name: "Cube",
    type: "Quantitative research system",
    description:
      "An evidence chain for market research, backtesting, execution, and monitoring—built to make every result inspectable.",
    tags: ["Research", "Markets", "Automation"],
  },
  {
    number: "02",
    name: "Energy",
    type: "European power markets",
    description:
      "Applying rigorous data and decision systems to power markets, where timing, physical reality, and uncertainty all matter.",
    tags: ["Energy", "Decision systems", "In progress"],
  },
  {
    number: "03",
    name: "Wayfinder",
    type: "Data you can trust",
    description:
      "Infrastructure for knowing what data exists, where it came from, when it was known, and whether it is healthy enough to use.",
    tags: ["Data", "Lineage", "Infrastructure"],
  },
  {
    number: "04",
    name: "Forecast Lab",
    type: "Auditable forecasting",
    description:
      "A workbench for turning resolvable questions into explicit probabilities, causal assumptions, and honest revisions.",
    tags: ["Forecasting", "Evidence", "Research"],
  },
];

const archiveProjects = [
  {
    name: "Tap the Trout",
    year: "2023",
    note: "A clicker game with one extremely clear KPI.",
    href: "https://github.com/965311532/tap-the-trout",
  },
  {
    name: "Trading signals research",
    year: "2022",
    note: "What happens when a guru meets an actual backtest.",
    href: "https://github.com/965311532/backtesting-results",
  },
  {
    name: "Ulam’s Spiral",
    year: "2022",
    note: "Prime numbers, arranged until a pattern appears.",
    href: "https://965311532.github.io/ulams-spiral/",
  },
];

function ExternalArrow() {
  return <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />;
}

export function PersonalSite() {
  const [troutTaps, setTroutTaps] = useState(0);

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Gabriele Armento, home">
          <span>GA</span>
          <i aria-hidden="true" />
        </a>

        <nav className="primary-nav" aria-label="Primary navigation">
          <a href="#now">Now</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="availability" href="mailto:gabriele.armento@gmail.com">
          <span aria-hidden="true" />
          Open to good questions
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-kicker reveal reveal-one">
          <span>Gabriele Armento</span>
          <span>Independent builder · Italy</span>
        </div>

        <h1 className="hero-title reveal reveal-two">
          I build systems
          <span>for uncertain worlds.</span>
        </h1>

        <div className="hero-lower reveal reveal-three">
          <div className="hero-intro">
            <p>
              Founder, software builder, and professional question-asker working
              where <strong>research</strong>, <strong>data</strong>, and
              <strong> decisions</strong> meet.
            </p>
            <a className="text-link" href="#now">
              See what I’m building <ArrowDown aria-hidden="true" size={17} />
            </a>
          </div>

          <div className="systems-map" aria-label="A map of Gabriele's working process">
            <span className="map-axis map-axis-x" aria-hidden="true" />
            <span className="map-axis map-axis-y" aria-hidden="true" />
            <span className="map-ring map-ring-one" aria-hidden="true" />
            <span className="map-ring map-ring-two" aria-hidden="true" />
            <span className="map-label map-label-one">Ask</span>
            <span className="map-label map-label-two">Build</span>
            <span className="map-label map-label-three">Test</span>
            <span className="map-label map-label-four">Learn</span>
            <span className="map-core">GA</span>
            <span className="map-orbit-dot" aria-hidden="true" />
          </div>
        </div>

        <div className="hero-index" aria-hidden="true">
          <span>44° N</span>
          <span>009° E</span>
          <span>EST. 2000</span>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>Product</span><i>✦</i><span>Research</span><i>✦</i>
          <span>Data</span><i>✦</i><span>Automation</span><i>✦</i>
          <span>Product</span><i>✦</i><span>Research</span><i>✦</i>
          <span>Data</span><i>✦</i><span>Automation</span><i>✦</i>
        </div>
      </div>

      <section className="section now-section" id="now">
        <div className="section-rail">
          <span>01 / Now</span>
          <p>Current coordinates</p>
        </div>

        <div className="section-content">
          <div className="section-heading">
            <p className="eyebrow">The current chapter</p>
            <h2>A small studio for hard problems.</h2>
          </div>

          <div className="now-grid">
            <article className="nace-card">
              <div className="nace-card-top">
                <span className="card-status"><i /> Building now</span>
                <span className="card-year">2026</span>
              </div>
              <div className="nace-mark">4NACE<span>↗</span></div>
              <p>
                The shared home for a portfolio of AI-applied products. Different
                problems, one operating belief: shorten the distance between a
                half-formed idea and a verified outcome.
              </p>
              <a href="https://4nace.com" target="_blank" rel="noreferrer">
                Visit 4nace.com <ExternalArrow />
              </a>
            </article>

            <div className="now-notes">
              <div className="note-block">
                <span>Working across</span>
                <p>Markets, energy, data infrastructure, forecasting, and AI-native workflows.</p>
              </div>
              <div className="note-block">
                <span>How I work</span>
                <p>Start with the real system. Make assumptions visible. Build the smallest useful proof.</p>
              </div>
              <div className="note-block note-block-blue">
                <span>Current obsession</span>
                <p>Giving ambitious ideas an evidence trail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-rail">
          <span>02 / Work</span>
          <p>Selected systems</p>
        </div>

        <div className="section-content">
          <div className="section-heading heading-row">
            <div>
              <p className="eyebrow">Active portfolio</p>
              <h2>Things I’m trying to make true.</h2>
            </div>
            <p className="heading-aside">
              Not a trophy shelf. These are living systems—each one a way of
              asking better questions at a different layer.
            </p>
          </div>

          <div className="project-list">
            {currentProjects.map((project) => (
              <article className="project-row" key={project.name}>
                <span className="project-number">{project.number}</span>
                <div className="project-name">
                  <h3>{project.name}</h3>
                  <span>{project.type}</span>
                </div>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>

          <div className="archive-head">
            <p className="eyebrow">Earlier experiments</p>
            <span>Useful detours & questionable ideas</span>
          </div>
          <div className="archive-list">
            {archiveProjects.map((project) => (
              <a href={project.href} target="_blank" rel="noreferrer" key={project.name}>
                <span>{project.year}</span>
                <strong>{project.name}</strong>
                <p>{project.note}</p>
                <ExternalArrow />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="fun-section" aria-labelledby="trout-title">
        <div className="trout-copy">
          <p className="eyebrow">A necessary break in seriousness</p>
          <h2 id="trout-title">Tap the trout.</h2>
          <p>
            Years ago, a friend and I built a website where the whole product
            was clicking a fish. Its strategy remains refreshingly legible.
          </p>
          <a href="https://tapthetrout.com" target="_blank" rel="noreferrer">
            Visit the original <ExternalArrow />
          </a>
        </div>
        <div className="trout-stage">
          <div className="trout-score" aria-live="polite">
            <span>{String(troutTaps).padStart(3, "0")}</span>
            successful fish interactions
          </div>
          <button
            className="trout-button"
            onClick={() => setTroutTaps((count) => count + 1)}
            aria-label="Tap the trout"
          >
            <span className="trout-body" aria-hidden="true">
              <i className="trout-eye" />
              <i className="trout-fin" />
              <i className="trout-tail" />
            </span>
          </button>
          <span className="trout-instruction">go on, it’s locally sourced ↗</span>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-rail">
          <span>03 / About</span>
          <p>The operator</p>
        </div>

        <div className="section-content">
          <div className="about-lead">
            <p className="eyebrow">Ciao, I’m Gabriele</p>
            <h2>
              Curious by default.<br />
              <em>Sceptical on purpose.</em>
            </h2>
          </div>

          <div className="about-grid">
            <div className="about-story">
              <p>
                I’m a self-taught software builder from Italy with a long-running
                interest in automation, finance, entrepreneurship, and the
                machinery behind good decisions.
              </p>
              <p>
                I moved from making web products quickly to building systems that
                have to remain honest under pressure. The technology changes; the
                instinct doesn’t: understand the structure, find the weak
                assumption, and make something real enough to test.
              </p>
            </div>

            <dl className="about-facts">
              <div><dt>Based</dt><dd>Genoa ↔ Milan, Italy</dd></div>
              <div><dt>Working mode</dt><dd>Ask → build → test → repeat</dd></div>
              <div><dt>Bias</dt><dd>Evidence over theatre</dd></div>
              <div><dt>Languages</dt><dd>Italian, English, Python, TypeScript</dd></div>
            </dl>
          </div>

          <aside className="wall-note">
            <span>Unofficial job title № 17</span>
            <blockquote>
              “The metaphorical wall my friends throw ideas at to see if they stick.”
            </blockquote>
            <p>High impact tolerance. No warranty on weak assumptions.</p>
          </aside>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-topline">
          <span>04 / Contact</span>
          <span>Good questions are always welcome.</span>
        </div>
        <p className="eyebrow">Have a strange, difficult, or useful problem?</p>
        <a className="contact-email" href="mailto:gabriele.armento@gmail.com">
          Let’s talk<span>.</span>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-footer">
          <p>
            Email is best. Context is appreciated.<br />
            Coffee may improve response quality.
          </p>
          <div className="social-links">
            <a href="mailto:gabriele.armento@gmail.com"><Mail aria-hidden="true" /> Email</a>
            <a href="https://www.linkedin.com/in/gabrielearmento/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
            <a href="https://github.com/965311532" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Gabriele Armento</span>
        <span>Built in Italy. Tested on the internet.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
