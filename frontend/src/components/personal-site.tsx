"use client";

import { useEffect } from "react";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { AmbientScene } from "./ambient-scene";

const projects = [
  {
    number: "01",
    name: "Cube",
    label: "Quantitative research system",
    question: "Can a market result explain exactly why it should be trusted?",
    description:
      "An evidence chain for research, backtesting, execution, and monitoring. Every conclusion stays connected to the data and assumptions that produced it.",
    tags: ["Markets", "Research", "Automation"],
    tone: "copper",
  },
  {
    number: "02",
    name: "Energy",
    label: "European power markets",
    question: "What changes when price has to answer to physics?",
    description:
      "Decision systems for power markets, where timing, physical delivery, regulation, and uncertainty have to coexist in one operating model.",
    tags: ["Energy", "Operations", "In progress"],
    tone: "steel",
  },
  {
    number: "03",
    name: "Wayfinder",
    label: "Data you can trust",
    question: "What did we know, when did we know it, and was it healthy?",
    description:
      "Infrastructure for finding data, tracing its origin, understanding its freshness, and deciding whether it is reliable enough to use.",
    tags: ["Data", "Lineage", "Infrastructure"],
    tone: "sage",
  },
  {
    number: "04",
    name: "Forecast Lab",
    label: "Auditable forecasting",
    question: "Can a belief become more useful by admitting it may be wrong?",
    description:
      "A workbench for resolvable questions, explicit probabilities, causal assumptions, and revisions that preserve what changed and why.",
    tags: ["Forecasting", "Evidence", "Research"],
    tone: "sand",
  },
];

function ExternalArrow({ size = 18 }: { size?: number }) {
  return <ArrowUpRight aria-hidden="true" size={size} strokeWidth={1.7} />;
}

export function PersonalSite() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        [
          ".work-intro > *",
          ".project-row > *",
          ".now-heading > *",
          ".now-statement > *",
          ".now-detail",
          ".operator-head > *",
          ".operator-bio p",
          ".contact-section > *",
        ].join(","),
      ),
    );

    targets.forEach((element, index) => {
      element.dataset.signalReveal = "";
      element.style.setProperty("--signal-delay", `${(index % 3) * 55}ms`);
    });
    document.documentElement.classList.add("signal-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-signal-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "-32px 0px" },
    );
    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("signal-motion-ready");
    };
  }, []);

  return (
    <main className="site-shell signal-site">
      <AmbientScene />

      <header className="signal-nav">
        <a className="signal-wordmark" href="#top" aria-label="Gabriele Armento, home">
          GABRIELE ARMENTO
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#now">Now</a>
          <a href="#about">About</a>
        </nav>
        <a className="signal-contact-link" href="mailto:gabriele.armento@gmail.com">
          Let&apos;s talk <ExternalArrow size={14} />
        </a>
      </header>

      <section className="signal-hero" id="top">
        <div className="hero-kicker">
          <span>Founder &amp; software builder</span>
          <span>Italy · 44° N</span>
        </div>

        <h1>
          Ideas are cheap.
          <span>Evidence is the work.</span>
        </h1>

        <div className="hero-footer">
          <p>
            I build products and decision systems for uncertain environments —
            across markets, energy, data, and forecasting.
          </p>
          <div className="hero-principle">
            <span>Operating principle</span>
            <strong>Make the reasoning visible.</strong>
          </div>
          <a href="#work">
            Selected work <ArrowDown aria-hidden="true" size={16} />
          </a>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="work-intro">
          <span className="section-label">01 / Selected work</span>
          <h2>Four systems for navigating uncertainty.</h2>
          <p>
            Different domains, one consistent standard: assumptions should be
            explicit, evidence should stay attached, and outcomes should be testable.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-row tone-${project.tone}`} key={project.name}>
              <div className="project-index">
                <span>{project.number}</span>
                <i aria-hidden="true" />
              </div>
              <div className="project-identity">
                <span>{project.label}</span>
                <h3>{project.name}</h3>
              </div>
              <div className="project-detail">
                <blockquote>{project.question}</blockquote>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="now-section" id="now">
        <div className="now-heading">
          <span className="section-label">02 / Building now</span>
          <p>Current focus · 2026</p>
        </div>
        <div className="now-statement">
          <div>
            <span className="now-status"><i /> Current portfolio</span>
            <h2>4NACE</h2>
          </div>
          <p>
            A portfolio studio for AI-applied products. Different markets, one
            operating belief: shorten the distance between an idea and a verified outcome.
          </p>
          <a href="https://4nace.com" target="_blank" rel="noreferrer">
            Visit 4nace.com <ExternalArrow />
          </a>
        </div>
        <div className="now-details">
          <article className="now-detail">
            <span>Working across</span>
            <p>Markets, energy, data infrastructure, forecasting, and AI-native workflows.</p>
          </article>
          <article className="now-detail">
            <span>Operating method</span>
            <p>Find the weak assumption. Build the smallest useful proof. Keep the evidence attached.</p>
          </article>
          <article className="now-detail">
            <span>Research direction</span>
            <p>Turning ambitious ideas into measurable systems that can be evaluated and improved.</p>
          </article>
        </div>
      </section>

      <section className="operator-section" id="about">
        <div className="operator-head">
          <span className="section-label">03 / About</span>
          <h2>Curious by default.</h2>
        </div>

        <div className="operator-grid">
          <div className="operator-bio">
            <p>
              I’m a self-taught software builder from Italy. I’m most at home
              turning ambiguous questions into working products—learning the
              domain, building the system, and testing whether the idea holds up
              in practice.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-topline">
          <span>04 / Contact</span>
          <span>Good questions are always welcome.</span>
        </div>
        <p>For collaborations, product conversations, or difficult technical problems.</p>
        <a className="contact-email" href="mailto:gabriele.armento@gmail.com">
          <span>Get in touch</span><ArrowUpRight aria-hidden="true" />
        </a>
        <div className="contact-footer">
          <p>Email is best. Context is appreciated.</p>
          <div className="social-links">
            <a href="mailto:gabriele.armento@gmail.com"><Mail aria-hidden="true" /> Email</a>
            <a href="https://www.linkedin.com/in/gabrielearmento/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
            <a href="https://github.com/965311532" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Gabriele Armento</span>
        <span>Independent builder / Italy</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
