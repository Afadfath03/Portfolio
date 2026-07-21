"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import {
  getDefaultLang,
  getLang,
  setLang,
  subscribeLang,
  type Lang,
  type SectionId,
  sectionIds,
} from "./i18n";
import type { Dict } from "./types";

// ponytail: JS timeouts own the timing (robust when tab hidden); CSS keyframes
// use matching durations in globals.css (.pane.exit-*/.pane.enter-*).
const T_EXIT = 250;
const T_ENTER = 400;
const T_LANG_EXIT = 200;
const T_LANG_ENTER = 300;

type Phase = "idle" | "exit" | "enter";
type Dir = "cw" | "ccw";

type Props = {
  initial: { en: Dict; id: Dict };
};

export default function PageClient({ initial }: Props) {
  const [active, setActive] = useState<SectionId>("home");
  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<Dir>("cw");
  const lang = useSyncExternalStore(subscribeLang, getLang, getDefaultLang);
  const [displayLang, setDisplayLang] = useState<Lang>(lang);
  const [langPhase, setLangPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const navigate = useCallback(
    (id: SectionId) => {
      if (phase !== "idle" || langPhase !== "idle" || id === active) return;
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
    [phase, langPhase, active]
  );

  const handleLang = useCallback(
    (newLang: Lang) => {
      if (newLang === displayLang || langPhase !== "idle" || phase !== "idle") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setLang(newLang);
        setDisplayLang(newLang);
        return;
      }
      setLang(newLang);
      setLangPhase("exit");
      timers.current.push(
        setTimeout(() => {
          setDisplayLang(newLang);
          setLangPhase("enter");
          timers.current.push(setTimeout(() => setLangPhase("idle"), T_LANG_ENTER));
        }, T_LANG_EXIT)
      );
    },
    [displayLang, langPhase, phase]
  );

  const tContent = initial[displayLang];
  const paneClass = phase === "idle" ? "pane" : `pane ${phase}-${dir}`;
  const langClass = langPhase !== "idle" ? `lang-${langPhase}` : "";

  return (
    <>
      <main className="layout">
        <div className={`lang-fade-all ${langClass}`}>
          <Nav t={tContent} active={active} onNavigate={navigate} />
          <div className="content">
            <div className={paneClass}>
              {active === "home" && <Hero t={tContent} visible />}
              {active === "about" && <About t={tContent} visible />}
              {active === "works" && <Works t={tContent} visible />}
              {active === "contact" && <Contact t={tContent} visible />}
            </div>
          </div>
        </div>
      </main>

      <div className="lang-toggle" role="group" aria-label="Language">
        <button
          className={lang === "en" ? "on" : ""}
          onClick={() => handleLang("en")}
          aria-pressed={lang === "en"}
        >
          EN
        </button>
        <button
          className={lang === "id" ? "on" : ""}
          onClick={() => handleLang("id")}
          aria-pressed={lang === "id"}
        >
          ID
        </button>
      </div>
    </>
  );
}
