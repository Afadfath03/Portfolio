import type { Dict } from "../i18n";

type Props = {
  t: Dict;
};

export default function Experience({ t }: Props) {
  return (
    <section className="section is-visible">
      <h2 className="sec-title reveal">{t.experience.title}</h2>
      <p className="exp-heading reveal">{t.experience.heading}</p>
      <div className="exp-list reveal">
        {t.experience.items.map((item) => (
          <article className="exp-card" key={item.role + item.company}>
            <div className="exp-top">
              <span className="exp-period">{item.period}</span>
            </div>
            <h3 className="exp-role">{item.role}</h3>
            <p className="exp-company">{item.company}</p>
            <p>{item.desc}</p>
            {item.tags.length > 0 && (
              <div className="exp-tags">
                {item.tags.map((tag) => (
                  <span className="exp-tag" key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
