import type { Dict } from "../i18n";

type Props = {
  t: Dict;
};

export default function Hero({ t }: Props) {
  return (
    <section className="section is-visible">
      <div className="hero-burst" aria-hidden="true" />
      {t.hero.image && (
        <img className="hero-image reveal" src={t.hero.image} alt="Profile" />
      )}
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
