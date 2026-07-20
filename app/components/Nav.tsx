"use client";

import { sectionIds, type Dict, type Lang, type SectionId } from "../i18n";

type Props = {
  t: Dict;
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  lang: Lang;
  onLang: (l: Lang) => void;
};

export default function Nav({ t, active, onNavigate, lang, onLang }: Props) {
  return (
    <>
      <nav className="nav" aria-label="Sections">
        {sectionIds.map((id) => (
          <button
            key={id}
            className={`nav-item ${active === id ? "active" : ""}`}
            onClick={() => onNavigate(id)}
            aria-current={active === id ? "true" : undefined}
          >
            <span>{t.nav[id]}</span>
          </button>
        ))}
      </nav>

      <div className="lang-toggle" role="group" aria-label="Language">
        <button
          className={lang === "en" ? "on" : ""}
          onClick={() => onLang("en")}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
        <button
          className={lang === "id" ? "on" : ""}
          onClick={() => onLang("id")}
          aria-pressed={lang === "id"}
        >
          ID
        </button>
      </div>
    </>
  );
}
