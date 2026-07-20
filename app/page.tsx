"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import {
  dict,
  getDefaultLang,
  getLang,
  sectionIds,
  setLang,
  subscribeLang,
  type SectionId,
} from "./i18n";

// ponytail: JS timeouts own the timing (robust when tab hidden); CSS keyframes
// use matching durations in globals.css (.pane.exit-*/.pane.enter-*).
const T_EXIT = 250;
const T_ENTER = 400;

type Phase = "idle" | "exit" | "enter";
type Dir = "cw" | "ccw";

export default function Page() {
  const [active, setActive] = useState<SectionId>("home");
  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<Dir>("cw");
  const lang = useSyncExternalStore(subscribeLang, getLang, getDefaultLang);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const navigate = useCallback(
    (id: SectionId) => {
      if (phase !== "idle" || id === active) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive(id);
        return;
      }
      setDir(sectionIds.indexOf(id) > sectionIds.indexOf(active) ? "cw" : "ccw");
      setPhase("exit");
      timers.current.push(
        setTimeout(() => {
          setActive(id);
          setPhase("enter");
          timers.current.push(setTimeout(() => setPhase("idle"), T_ENTER));
        }, T_EXIT)
      );
    },
    [phase, active]
  );

  const t = dict[lang];
  const paneClass = phase === "idle" ? "pane" : `pane ${phase}-${dir}`;

  return (
    <main className="layout">
      <Nav t={t} active={active} onNavigate={navigate} lang={lang} onLang={setLang} />

      <div className="content">
        <div className={paneClass}>
          {active === "home" && <Hero t={t} visible />}
          {active === "about" && <About t={t} visible />}
          {active === "works" && <Works t={t} visible />}
          {active === "contact" && <Contact t={t} visible />}
        </div>
      </div>
    </main>
  );
}
