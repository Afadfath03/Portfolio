import type { Dict } from "../i18n";

type Props = {
  t: Dict;
  visible: boolean;
};

export default function Hero({ t, visible }: Props) {
  return (
    <section className={`section ${visible ? "is-visible" : ""}`}>
      <div className="hero-burst" aria-hidden="true" />
      <p className="hero-greet reveal">{t.hero.greeting}</p>
      <h1 className="hero-name reveal">
        <span className="line1">AFAD FATH</span>
        <span className="line2">MUSYAROF HALIM</span>
      </h1>
      <p className="hero-tag reveal">{t.hero.tagline}</p>
      <p className="hero-sub reveal">{t.hero.sub}</p>
    </section>
  );
}
