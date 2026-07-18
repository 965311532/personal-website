"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { OrbitScene } from "./orbit-scene";

const projects = [
  {
    number: "01",
    name: "Cube",
    label: "Quantitative research system",
    question: "Can a market result explain exactly why it should be trusted?",
    description:
      "An evidence chain for research, backtesting, execution, and monitoring. Every conclusion stays connected to the data and assumptions that produced it.",
    tags: ["Markets", "Research", "Automation"],
    kind: "cube",
    signal: "Evidence",
  },
  {
    number: "02",
    name: "Energy",
    label: "European power markets",
    question: "What changes when price has to answer to physics?",
    description:
      "Decision systems for power markets, where timing, physical delivery, regulation, and uncertainty have to coexist in one operating model.",
    tags: ["Energy", "Operations", "In progress"],
    kind: "energy",
    signal: "Physics",
  },
  {
    number: "03",
    name: "Wayfinder",
    label: "Data you can trust",
    question: "What did we know, when did we know it, and was it healthy?",
    description:
      "Infrastructure for finding data, tracing its origin, understanding its freshness, and deciding whether it is reliable enough to use.",
    tags: ["Data", "Lineage", "Infrastructure"],
    kind: "wayfinder",
    signal: "Origin",
  },
  {
    number: "04",
    name: "Forecast Lab",
    label: "Auditable forecasting",
    question: "Can a belief become more useful by admitting it may be wrong?",
    description:
      "A workbench for resolvable questions, explicit probabilities, causal assumptions, and revisions that preserve what changed and why.",
    tags: ["Forecasting", "Evidence", "Research"],
    kind: "forecast",
    signal: "Belief",
  },
];

const experiments = [
  { name: "Tap the Trout", year: "2023", href: "https://github.com/965311532/tap-the-trout" },
  { name: "Trading signals research", year: "2022", href: "https://github.com/965311532/backtesting-results" },
  { name: "Ulam’s Spiral", year: "2022", href: "https://965311532.github.io/ulams-spiral/" },
];

function ExternalArrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRight aria-hidden="true" size={size} strokeWidth={1.8} />;
}

export function PersonalSite() {
  const [troutTaps, setTroutTaps] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          ".orbit-work-intro > *",
          ".project-chapter > *",
          ".transmission-head > *",
          ".transmission-main > *",
          ".transmission-note",
          ".experiment-head > *",
          ".experiment-list a",
          ".control-copy > *",
          ".trout-console",
          ".operator-head > *",
          ".operator-bio p",
          ".operator-facts > div",
          ".operator-quote",
          ".contact-section > *",
          ".site-footer > *",
        ].join(","),
      ),
    );

    targets.forEach((element, index) => {
      element.dataset.signalReveal = "";
      element.style.setProperty("--signal-delay", `${(index % 4) * 60}ms`);
    });
    document.documentElement.classList.add("signal-motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-signal-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "-42px 0px" },
    );
    targets.forEach((element) => revealObserver.observe(element));

    const projectChapters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-project-index]"),
    );
    const projectObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveProject(Number((visible.target as HTMLElement).dataset.projectIndex));
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-14% 0px -14% 0px" },
    );
    projectChapters.forEach((chapter) => projectObserver.observe(chapter));

    return () => {
      revealObserver.disconnect();
      projectObserver.disconnect();
      document.documentElement.classList.remove("signal-motion-ready");
    };
  }, []);

  const focusedProject = projects[activeProject];

  return (
    <main className="site-shell signal-site">
      <header className="signal-nav">
        <a className="signal-wordmark" href="#top" aria-label="Gabriele Armento, home">
          GA<span aria-hidden="true" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#now">Now</a>
          <a href="#about">About</a>
        </nav>
        <a className="signal-contact-link" href="mailto:gabriele.armento@gmail.com">
          Start a conversation <ExternalArrow size={15} />
        </a>
      </header>

      <section className="signal-hero" id="top">
        <div className="signal-hero-copy">
          <div className="signal-identity">
            <span>Gabriele Armento</span>
            <span>Founder + software builder</span>
          </div>
          <h1>
            Ideas are cheap.
            <span>Evidence is the work.</span>
          </h1>
          <div className="signal-hero-bottom">
            <p>
              I build products and decision systems for uncertain environments,
              from markets and energy to data and forecasting.
            </p>
            <a href="#work">
              Enter the system <ArrowDown aria-hidden="true" size={18} />
            </a>
          </div>
        </div>

        <div className="signal-field" aria-label="An interactive orbital model of Gabriele's work">
          <OrbitScene variant="hero" />
          <div className="field-head">
            <span>Ideas in motion</span>
            <span>44° N / Italy</span>
          </div>
          <div className="field-core-label" aria-hidden="true">
            <span>GA</span>
            <small>operator / 01</small>
          </div>
          <div className="field-foot">
            <span>Move cursor / rotate field</span>
            <span>Four active systems</span>
          </div>
        </div>
      </section>

      <section className="orbit-work-section" id="work">
        <div className="orbit-work-intro">
          <div className="section-code">
            <span>01 / Active worlds</span>
            <span>One operator, four questions</span>
          </div>
          <h2>Different terrain.<br />The same gravitational pull.</h2>
          <p>
            I keep returning to systems where the answer matters, the inputs are
            imperfect, and the reasoning needs to survive inspection.
          </p>
        </div>

        <div className="orbit-work-grid">
          <aside className="orbit-work-stage" aria-label={`Focused project: ${focusedProject.name}`}>
            <OrbitScene variant="projects" activeIndex={activeProject} />
            <div className="orbit-stage-topline">
              <span>System map / live</span>
              <span>{focusedProject.number} — 04</span>
            </div>
            <div className="orbit-stage-focus" aria-live="polite">
              <span>Current gravity</span>
              <strong>{focusedProject.name}</strong>
              <small>{focusedProject.signal}</small>
            </div>
            <div className="orbit-stage-index" aria-hidden="true">
              {projects.map((project, index) => (
                <span className={index === activeProject ? "is-active" : ""} key={project.name}>
                  {project.number}
                </span>
              ))}
            </div>
          </aside>

          <div className="orbit-projects">
            {projects.map((project, index) => (
              <article
                className={`project-chapter project-${project.kind}`}
                data-project-index={index}
                key={project.name}
              >
                <div className="project-chapter-meta">
                  <span>{project.number} / 04</span>
                  <span>{project.label}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{project.name}</h3>
                <blockquote>{project.question}</blockquote>
                <p>{project.description}</p>
                <div className="project-chapter-foot">
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <span className="project-signal">Core signal / {project.signal}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="transmission-section" id="now">
        <div className="transmission-head">
          <span>02 / Current transmission</span>
          <span>Broadcasting from 4NACE</span>
          <span>2026 / live</span>
        </div>
        <div className="transmission-main">
          <p className="transmission-kicker"><i /> Building now</p>
          <h2>4NACE</h2>
          <p className="transmission-thesis">
            A portfolio studio for AI-applied products. Different markets, one
            operating belief: shorten the distance between an idea and a verified outcome.
          </p>
          <a href="https://4nace.com" target="_blank" rel="noreferrer">
            Visit 4nace.com <ExternalArrow />
          </a>
        </div>
        <div className="transmission-notes">
          <article className="transmission-note">
            <span>Working across</span>
            <p>Markets, energy, data infrastructure, forecasting, and AI-native workflows.</p>
          </article>
          <article className="transmission-note">
            <span>Operating method</span>
            <p>Find the weak assumption. Build the smallest useful proof. Keep the evidence attached.</p>
          </article>
          <article className="transmission-note">
            <span>Current obsession</span>
            <p>Turning ambitious ideas into systems that can survive contact with reality.</p>
          </article>
        </div>
      </section>

      <section className="experiment-section">
        <div className="experiment-head">
          <span>Side channel / earlier experiments</span>
          <h2>Small proofs.<br />Useful detours.</h2>
        </div>
        <div className="experiment-list">
          {experiments.map((experiment) => (
            <a href={experiment.href} target="_blank" rel="noreferrer" key={experiment.name}>
              <span>{experiment.year}</span>
              <strong>{experiment.name}</strong>
              <ExternalArrow />
            </a>
          ))}
        </div>
      </section>

      <section className="control-section" aria-labelledby="trout-title">
        <div className="control-copy">
          <span>Mobile easter egg / highly scientific</span>
          <h2 id="trout-title">One fish.<br />One metric.</h2>
          <p>A friend and I once built a website whose entire strategy was clicking a trout.</p>
        </div>
        <div className="trout-console">
          <div className="console-score" aria-live="polite">
            <span>{String(troutTaps).padStart(3, "0")}</span> confirmed interactions
          </div>
          <button className="trout-button" onClick={() => setTroutTaps((count) => count + 1)} aria-label="Tap the trout">
            <span className="trout-body" aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
      </section>

      <section className="operator-section" id="about">
        <div className="operator-head">
          <span>03 / Operator index</span>
          <h2>Curious by default.<span>Sceptical on purpose.</span></h2>
        </div>
        <div className="operator-grid">
          <div className="operator-bio">
            <p>I’m a self-taught software builder from Italy with a long-running interest in automation, finance, entrepreneurship, and the machinery behind good decisions.</p>
            <p>The technology changes. The instinct doesn’t: understand the structure, find the weak assumption, and make something real enough to test.</p>
          </div>
          <dl className="operator-facts">
            <div><dt>Base</dt><dd>Genoa ↔ Milan, Italy</dd></div>
            <div><dt>Mode</dt><dd>Ask → build → test → repeat</dd></div>
            <div><dt>Bias</dt><dd>Evidence over theatre</dd></div>
            <div><dt>Languages</dt><dd>Italian, English, Python, TypeScript</dd></div>
          </dl>
        </div>
        <aside className="operator-quote">
          <span>Unofficial job title № 17</span>
          <blockquote>“The metaphorical wall my friends throw ideas at to see if they stick.”</blockquote>
          <p>High impact tolerance. No warranty on weak assumptions.</p>
        </aside>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-topline"><span>04 / Contact</span><span>Good questions are always welcome.</span></div>
        <p>Have a strange, difficult, or useful problem?</p>
        <a className="contact-email" href="mailto:gabriele.armento@gmail.com">
          Send a signal<span>.</span><ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-footer">
          <p>Email is best. Context is appreciated.<br />Coffee may improve response quality.</p>
          <div className="social-links">
            <a href="mailto:gabriele.armento@gmail.com"><Mail aria-hidden="true" /> Email</a>
            <a href="https://www.linkedin.com/in/gabrielearmento/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
            <a href="https://github.com/965311532" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Gabriele Armento</span><span>Independent builder / Italy</span><a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
