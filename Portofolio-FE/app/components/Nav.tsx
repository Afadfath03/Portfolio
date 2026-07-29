"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sectionIds, type Dict, type SectionId } from "../i18n";

type Props = {
  t: Dict;
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  indicator: SectionId | null;
};

export default function Nav({ t, active, onNavigate, indicator }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const btnRefs = useRef<Map<SectionId, HTMLButtonElement>>(new Map());
  const [glideTop, setGlideTop] = useState(0);
  const [glideHeight, setGlideHeight] = useState(0);
  const [glideOpacity, setGlideOpacity] = useState(0);

  useEffect(() => {
    const target = indicator ?? active;
    const btn = btnRefs.current.get(target);
    if (btn && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setGlideTop(btnRect.top - navRect.top);
      setGlideHeight(btnRect.height);
    }
    setGlideOpacity(0.45);
  }, [indicator, active]);

  const setBtnRef = useCallback(
    (id: SectionId) => (el: HTMLButtonElement | null) => {
      if (el) btnRefs.current.set(id, el);
      else btnRefs.current.delete(id);
    },
    []
  );

  return (
    <nav className="nav" ref={navRef} aria-label="Sections">
      <div
        className="nav-glide"
        style={{ top: glideTop, height: glideHeight, opacity: glideOpacity }}
      />
      {sectionIds.map((id) => (
        <button
          key={id}
          ref={setBtnRef(id)}
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
