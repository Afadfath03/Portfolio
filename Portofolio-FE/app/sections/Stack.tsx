import type { Dict } from "../i18n";

type Props = {
  t: Dict;
  visible: boolean;
};

export default function Stack({ t, visible }: Props) {
  return (
    <section className={`section ${visible ? "is-visible" : ""}`}>
      <h2 className="sec-title reveal">{t.stack.title}</h2>
      <p className="stack-heading reveal">{t.stack.heading}</p>
      <div className="stack-grid reveal">
        {t.stack.categories.map((cat) => (
          <div className="stack-card" key={cat.name}>
            <div className={`stack-icon stack-icon-${cat.icon}`} />
            <h3 className="stack-cat-name">{cat.name}</h3>
            <div className="stack-items">
              {cat.items.map((item) => (
                <span className="stack-pill" key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
