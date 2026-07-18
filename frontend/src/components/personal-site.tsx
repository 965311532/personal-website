"use client";

import { useEffect, useState } from "react";
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
      "An evidence chain for market research, backtesting, execution, and monitoring, built to make every result inspectable.",
    tags: ["Research", "Markets", "Automation"],
    signal: "Evidence before conviction",
    visual: "cube",
  },
  {
    number: "02",
    name: "Energy",
    type: "European power markets",
    description:
      "Rigorous data and decision systems for a market where timing, physical reality, and uncertainty all matter.",
    tags: ["Energy", "Decision systems", "In progress"],
    signal: "Price meets physics",
    visual: "energy",
  },
  {
    number: "03",
    name: "Wayfinder",
    type: "Data you can trust",
    description:
      "Infrastructure for knowing what data exists, where it came from, when it was known, and whether it is healthy enough to use.",
    tags: ["Data", "Lineage", "Infrastructure"],
    signal: "Know what you know",
    visual: "wayfinder",
  },
  {
    number: "04",
    name: "Forecast Lab",
    type: "Auditable forecasting",
    description:
      "A workbench for turning resolvable questions into explicit probabilities, causal assumptions, and honest revisions.",
    tags: ["Forecasting", "Evidence", "Research"],
    signal: "Beliefs with receipts",
    visual: "forecast",
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

function ProjectVisual({ kind, name }: { kind: string; name: string }) {
  return (
    <div className={`project-visual project-visual-${kind}`} aria-hidden="true">
      <span className="visual-label">{name} / live system</span>
      <div className="visual-canvas">
        <i className="visual-line visual-line-one" />
        <i className="visual-line visual-line-two" />
        <i className="visual-line visual-line-three" />
        <i className="visual-node visual-node-one" />
        <i className="visual-node visual-node-two" />
        <i className="visual-node visual-node-three" />
        <strong>{kind === "forecast" ? "67%" : name.slice(0, 2).toUpperCase()}</strong>
      </div>
      <span className="visual-status">signal / verified</span>
    </div>
  );
}

export function PersonalSite() {
  const [troutTaps, setTroutTaps] = useState(0);

  useEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          ".manifesto-copy > *",
          ".now-card",
          ".now-note",
          ".work-intro > *",
          ".project-billboard > *",
          ".archive-title > *",
          ".archive-list a",
          ".trout-copy > *",
          ".trout-stage",
          ".about-statement > *",
          ".about-story p",
          ".about-facts > div",
          ".wall-note",
          ".contact-section > *",
          ".site-footer > *",
        ].join(","),
      ),
    );

    revealTargets.forEach((element, index) => {
      element.dataset.punchReveal = "";
      element.style.setProperty("--punch-stagger", `${(index % 4) * 65}ms`);
    });

    document.documentElement.classList.add("punch-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-punch-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "-36px 0px" },
    );

    revealTargets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("punch-motion-ready");
    };
  }, []);

  return (
    <main className="site-shell vibe-site punch-site">
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
          Available for good questions
        </a>
      </header>

      <section className="punch-hero" id="top">
        <div className="hero-meta hero-meta-top">
          <span>Independent builder</span>
          <span>Italy / 44° N</span>
        </div>

        <div className="hero-name" aria-label="Gabriele Armento">
          <span className="hero-name-first">Gabriele</span>
          <span className="hero-name-last">Armento</span>
        </div>

        <div className="hero-orbit" aria-label="Ask, build, test, learn">
          <span className="orbit-word orbit-ask">Ask</span>
          <span className="orbit-word orbit-build">Build</span>
          <span className="orbit-word orbit-test">Test</span>
          <span className="orbit-word orbit-learn">Learn</span>
          <span className="orbit-ring orbit-ring-one" aria-hidden="true" />
          <span className="orbit-ring orbit-ring-two" aria-hidden="true" />
          <span className="orbit-core">GA</span>
        </div>

        <div className="hero-bottom">
          <p>
            I turn ambitious, uncertain ideas into systems that can be tested,
            inspected, and improved.
          </p>
          <a href="#work" className="hero-cta">
            Enter the work <ArrowDown aria-hidden="true" size={18} />
          </a>
          <div className="hero-fields" aria-hidden="true">
            <span>Research</span>
            <span>Data</span>
            <span>Markets</span>
            <span>AI</span>
          </div>
        </div>
      </section>

      <section className="manifesto-section" id="now">
        <div className="manifesto-index">
          <span>01</span>
          <p>Right now</p>
        </div>
        <div className="manifesto-copy">
          <p className="eyebrow">The current chapter</p>
          <h1>
            I make ambiguity
            <span>operational.</span>
          </h1>
          <p className="manifesto-aside">
            Not by making uncertainty disappear. By making assumptions visible,
            decisions traceable, and the next move obvious.
          </p>
        </div>

        <div className="now-card">
          <div className="now-card-head">
            <span><i /> Building now</span>
            <span>2026</span>
          </div>
          <div className="now-card-title">4NACE<sup>↗</sup></div>
          <p>
            A portfolio studio for AI-applied products. Different markets, one
            operating belief: shorten the distance between an idea and a
            verified outcome.
          </p>
          <a href="https://4nace.com" target="_blank" rel="noreferrer">
            Visit 4nace.com <ExternalArrow />
          </a>
        </div>

        <div className="now-notes">
          <div className="now-note">
            <span>Working across</span>
            <p>Markets, energy, data infrastructure, forecasting, AI-native workflows.</p>
          </div>
          <div className="now-note">
            <span>Operating method</span>
            <p>Start with the real system. Find the weak assumption. Build the smallest useful proof.</p>
          </div>
          <div className="now-note now-note-accent">
            <span>Current obsession</span>
            <p>Giving ambitious ideas an evidence trail.</p>
          </div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="work-intro">
          <div>
            <span>02 / Selected systems</span>
            <span>Four live questions</span>
          </div>
          <h2>Work that earns its confidence.</h2>
          <p>
            These are not finished trophies. They are active systems, each one
            designed to make a different kind of uncertainty more tractable.
          </p>
        </div>

        <div className="project-gallery">
          {currentProjects.map((project) => (
            <article className={`project-billboard project-${project.visual}`} key={project.name}>
              <div className="project-copy">
                <div className="project-kicker">
                  <span>{project.number}</span>
                  <span>{project.type}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <strong className="project-signal">{project.signal}</strong>
              </div>
              <ProjectVisual kind={project.visual} name={project.name} />
            </article>
          ))}
        </div>

        <div className="archive-wrap">
          <div className="archive-title">
            <p className="eyebrow">Earlier experiments</p>
            <h2>Useful detours.</h2>
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
          <p className="eyebrow">A strategically vital intermission</p>
          <h2 id="trout-title">Tap the trout.</h2>
          <p>
            A friend and I once built a product where the whole strategy was
            clicking a fish. Its roadmap remains refreshingly legible.
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

      <section className="about-section" id="about">
        <div className="about-statement">
          <p className="eyebrow">03 / The operator</p>
          <h2>
            Curious by default.
            <span>Sceptical on purpose.</span>
          </h2>
        </div>

        <div className="about-body">
          <div className="about-story">
            <p>
              I’m a self-taught software builder from Italy with a long-running
              interest in automation, finance, entrepreneurship, and the
              machinery behind good decisions.
            </p>
            <p>
              The technology changes; the instinct doesn’t: understand the
              structure, find the weak assumption, and make something real
              enough to test.
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
