import type { Dict } from "../types";

type Props = {
  t: Dict;
  visible: boolean;
};

export default function Works({ t, visible }: Props) {
  return (
    <section className={`section ${visible ? "is-visible" : ""}`}>
      <h2 className="sec-title reveal">{t.works.title}</h2>
      <div className="works-grid">
        {t.works.items.map((w) => (
          <article className="work-card reveal" key={w.name}>
            {w.image && <img className="work-image" src={w.image} alt={w.name} />}
            <span className="work-tag">{w.tag}</span>
            <h3>{w.name}</h3>
            <p>{w.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
