"use client";

import { sectionIds, type Dict, type SectionId } from "../i18n";

type Props = {
  t: Dict;
  active: SectionId;
  onNavigate: (id: SectionId) => void;
};

export default function Nav({ t, active, onNavigate }: Props) {
  return (
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
  );
}
