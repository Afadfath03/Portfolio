import type { Dict } from "../i18n";

type Props = {
  t: Dict;
  visible: boolean;
};

export default function About({ t, visible }: Props) {
  return (
    <section className={`section ${visible ? "is-visible" : ""}`}>
      <h2 className="sec-title reveal">{t.about.title}</h2>
      <div className="about-panel reveal">
        <p className="about-heading">{t.about.heading}</p>
        <p>{t.about.body}</p>
        <div className="about-stats">
          {t.about.stats.map((s) => (
            <div className="about-stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
