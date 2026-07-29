"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Works from "./sections/Works";
import Contact from "./sections/Contact";
import {
  getDefaultLang,
  getLang,
  setLang,
  subscribeLang,
  type Dict,
  type Lang,
  type SectionId,
  sectionIds,
} from "./i18n";

// ponytail: JS timeouts own the timing (robust when tab hidden); CSS keyframes
// use matching durations in globals.css (.pane.exit-*/.pane.enter-*).
const T_EXIT = 180;
const T_ENTER = 280;
const T_LANG_EXIT = 200;
const T_LANG_ENTER = 300;

type Phase = "idle" | "exit" | "enter";
type Dir = "cw" | "ccw";

type Props = {
  initial: { en: Dict; id: Dict } | null;
};

export default function PageClient({ initial }: Props) {
  const [active, setActive] = useState<SectionId>("home");
  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<Dir>("cw");
  const [indicator, setIndicator] = useState<SectionId | null>(null);
  const [content, setContent] = useState(initial);
  const [error, setError] = useState(false);
  const lang = useSyncExternalStore(subscribeLang, getLang, getDefaultLang);
  const [displayLang, setDisplayLang] = useState<Lang>(lang);
  const [langPhase, setLangPhase] = useState<Phase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  const fetchContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setContent(data);
      setError(false);
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const navigate = useCallback(
    (id: SectionId) => {
      if (phase !== "idle" || langPhase !== "idle" || id === active) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive(id);
        return;
      }
      setDir(sectionIds.indexOf(id) > sectionIds.indexOf(active) ? "cw" : "ccw");
      setPhase("exit");
      setIndicator(id);
      timers.current.push(
        setTimeout(() => {
          setActive(id);
          setIndicator(null);
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

  if (content === null) {
    if (error) {
      return (
        <div className="err-wrap">
          <p className="err-head">CONNECTION LOST</p>
          <p className="err-sub">Can&apos;t reach the server. Please try again.</p>
          <div className="err-actions">
            <button className="err-retry" onClick={fetchContent}>RETRY</button>
            <Link href="/" className="err-home">BACK HOME</Link>
          </div>
        </div>
      );
    }
    return (
      <div className="ld-wrap">
        <div className="ld-dot" />
      </div>
    );
  }

  const tContent = content[displayLang];
  const paneClass = phase === "idle" ? "pane" : `pane ${phase}-${dir}`;
  const langClass = langPhase !== "idle" ? `lang-${langPhase}` : "";

  return (
    <>
      <main className="layout">
        <div className={`lang-fade-all ${langClass}`}>
          <Nav t={tContent} active={active} onNavigate={navigate} indicator={indicator} />
          <div className="content">
            <div className={paneClass}>
              {active === "home" && <Hero t={tContent} />}
              {active === "about" && <About t={tContent} />}
              {active === "stack" && <Stack t={tContent} />}
              {active === "experience" && <Experience t={tContent} />}
              {active === "education" && <Education t={tContent} />}
              {active === "works" && <Works t={tContent} />}
              {active === "contact" && <Contact t={tContent} />}
            </div>
          </div>
        </div>
      </main>

      <div className={`lang-toggle lang-${lang}`} role="group" aria-label="Language">
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
