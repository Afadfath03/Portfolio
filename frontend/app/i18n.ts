// ponytail: lang store + section IDs only. Dict type lives in types.ts.

export type Lang = "en" | "id";
export type SectionId = "home" | "about" | "works" | "contact";

export const sectionIds: SectionId[] = ["home", "about", "works", "contact"];

// --- lang store (in-memory, for useSyncExternalStore) ---

const langListeners = new Set<() => void>();
let currentLang: Lang = "en";

export function getLang(): Lang {
  return currentLang;
}

export function getDefaultLang(): Lang {
  return "en";
}

export function setLang(l: Lang) {
  currentLang = l;
  langListeners.forEach((fn) => fn());
}

export function subscribeLang(fn: () => void) {
  langListeners.add(fn);
  return () => {
    langListeners.delete(fn);
  };
}
