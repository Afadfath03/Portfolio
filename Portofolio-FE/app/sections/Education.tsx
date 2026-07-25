import type { Dict } from "../i18n";

type Props = {
  t: Dict;
  visible: boolean;
};

export default function Education({ t, visible }: Props) {
  return (
    <section className={`section ${visible ? "is-visible" : ""}`}>
      <h2 className="sec-title reveal">{t.education.title}</h2>
      <p className="edu-heading">{t.education.heading}</p>
      <div className="edu-list">
        {t.education.items.map((item) => (
          <article className="edu-card" key={item.degree + item.school}>
            <span className="edu-year">{item.year}</span>
            <h3 className="edu-degree">{item.degree}</h3>
            <p className="edu-school">{item.school}</p>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
