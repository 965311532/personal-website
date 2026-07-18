import Link from "next/link";
import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Cormorant_Garamond,
  DM_Sans,
  Instrument_Serif,
  Manrope,
  Newsreader,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
import styles from "./type-lab.module.css";

export const metadata: Metadata = {
  title: "Typography study",
  robots: { index: false, follow: false },
};

const manrope = Manrope({ subsets: ["latin"], variable: "--font-a-sans" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-a-serif",
});
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-b-sans" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-b-serif" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-c-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-c-serif",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-d-sans",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-d-serif",
});

const options = [
  {
    id: "A",
    name: "Clear / Editorial",
    fonts: "Manrope + Instrument Serif",
    note: "Confident and contemporary, with a warm second voice.",
    className: styles.optionA,
  },
  {
    id: "B",
    name: "Technical / Literary",
    fonts: "Space Grotesk + Newsreader",
    note: "Sharper and more analytical without feeling cold.",
    className: styles.optionB,
  },
  {
    id: "C",
    name: "Quiet / Cultured",
    fonts: "DM Sans + Cormorant Garamond",
    note: "The most elegant option, with a stronger editorial contrast.",
    className: styles.optionC,
  },
  {
    id: "D",
    name: "Character / Precision",
    fonts: "Bricolage Grotesque + Source Serif 4",
    note: "More distinctive and human, while staying professional.",
    className: styles.optionD,
  },
];

export default function TypeLabPage() {
  return (
    <main
      className={`${styles.lab} ${manrope.variable} ${instrument.variable} ${space.variable} ${newsreader.variable} ${dmSans.variable} ${cormorant.variable} ${bricolage.variable} ${sourceSerif.variable}`}
    >
      <header className={styles.header}>
        <div>
          <span>Personal site / Type study</span>
          <h1>Choose the relationship, not just the font.</h1>
        </div>
        <Link href="/">Back to site ↗</Link>
      </header>

      <section className={styles.grid} aria-label="Typography options">
        {options.map((option) => (
          <article className={`${styles.sample} ${option.className}`} key={option.id}>
            <div className={styles.meta}>
              <strong>{option.id}</strong>
              <span>{option.name}</span>
              <small>{option.fonts}</small>
            </div>
            <div className={styles.hero}>
              <p>GABRIELE ARMENTO</p>
              <h2>
                Ideas are cheap.
                <span>Evidence is the work.</span>
              </h2>
            </div>
            <div className={styles.copy}>
              <p>
                I build products and decision systems for uncertain environments—
                across markets, energy, data, and forecasting.
              </p>
              <span>{option.note}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
