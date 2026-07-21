import type { Dict } from "../types";

type Props = {
  t: Dict;
  visible: boolean;
};

export default function Contact({ t, visible }: Props) {
  return (
    <section className={`section ${visible ? "is-visible" : ""}`}>
      <h2 className="sec-title reveal">{t.contact.title}</h2>
      <div className="cc-card reveal">
        <p className="cc-head">{t.contact.heading}</p>
        <ul className="cc-list">
          {t.contact.links.map((l) => (
            <li key={l.label}>
              <span>{l.label}</span>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
