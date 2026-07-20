// ponytail: flat dict. Move to next-intl only if strings > ~200 or plural/ICU needed.

export type Lang = "en" | "id";
export type SectionId = "home" | "about" | "works" | "contact";

export const sectionIds: SectionId[] = ["home", "about", "works", "contact"];

const en = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    works: "WORKS",
    contact: "CONTACT",
  },
  hero: {
    greeting: "AD ASTRA, PER ASPERA",
    tagline: "From Paradox to Paradigm",
    sub: "Even I don't know how these works",
  },
  about: {
    title: "ABOUT",
    heading: "A walking contradiction, on purpose.",
    body: "Placeholder bio. I'm Afad Fath — a developer who treats constraints as a canvas. Logical by day, absurd by night; the best ideas live exactly where the two collide. Replace this paragraph with your real story.",
    stats: [
      { value: "X+", label: "YEARS CODING" },
      { value: "XX", label: "PROJECTS SHIPPED" },
      { value: "∞", label: "IDEAS QUEUED" },
    ],
  },
  works: {
    title: "WORKS",
    items: [
      {
        tag: "WEB",
        name: "PROJECT ONE",
        desc: "Placeholder project. A thing that solves a problem nobody admitted having.",
      },
      {
        tag: "APP",
        name: "PROJECT TWO",
        desc: "Placeholder project. Built backwards: the interface came first, the logic caught up.",
      },
      {
        tag: "EXPERIMENT",
        name: "PROJECT THREE",
        desc: "Placeholder project. Technically useless, aesthetically essential.",
      },
    ],
  },
  contact: {
    title: "CONTACT",
    heading: "Let's make something impossible.",
    links: [
      { label: "EMAIL", value: "hello@afadfath.dev", href: "mailto:hello@afadfath.dev" },
      { label: "GITHUB", value: "@afadfath", href: "https://github.com/afadfath" },
      { label: "LINKEDIN", value: "in/afadfath", href: "https://linkedin.com/in/afadfath" },
    ],
  },
};

export type Dict = typeof en;

const id: Dict = {
  nav: {
    home: "BERANDA",
    about: "TENTANG",
    works: "KARYA",
    contact: "KONTAK",
  },
  hero: {
    greeting: "AD ASTRA, PER ASPERA",
    tagline: "From Paradox to Paradigm",
    sub: "Even I don't know how these works",
  },
  about: {
    title: "TENTANG",
    heading: "Kontradiksi berjalan, dengan sengaja.",
    body: "Bio placeholder. Saya Afad Fath — developer yang memperlakukan batasan sebagai kanvas. Logis di siang hari, absurd di malam hari; ide terbaik lahir tepat di titik tabrakan keduanya. Ganti paragraf ini dengan cerita aslimu.",
    stats: [
      { value: "X+", label: "TAHUN NGODING" },
      { value: "XX", label: "PROYEK RILIS" },
      { value: "∞", label: "IDE ANTRI" },
    ],
  },
  works: {
    title: "KARYA",
    items: [
      {
        tag: "WEB",
        name: "PROYEK SATU",
        desc: "Proyek placeholder. Sesuatu yang menyelesaikan masalah yang tak diakui orang.",
      },
      {
        tag: "APP",
        name: "PROYEK DUA",
        desc: "Proyek placeholder. Dibangun terbalik: antarmuka dulu, logika menyusul.",
      },
      {
        tag: "EKSPERIMEN",
        name: "PROYEK TIGA",
        desc: "Proyek placeholder. Secara teknis tidak berguna, secara estetika wajib ada.",
      },
    ],
  },
  contact: {
    title: "KONTAK",
    heading: "Mari buat sesuatu yang mustahil.",
    links: [
      { label: "EMAIL", value: "hello@afadfath.dev", href: "mailto:hello@afadfath.dev" },
      { label: "GITHUB", value: "@afadfath", href: "https://github.com/afadfath" },
      { label: "LINKEDIN", value: "in/afadfath", href: "https://linkedin.com/in/afadfath" },
    ],
  },
};

export const dict: Record<Lang, Dict> = { en, id };

// --- lang store (localStorage-backed, for useSyncExternalStore) ---

const langListeners = new Set<() => void>();

export function getLang(): Lang {
  return localStorage.getItem("lang") === "id" ? "id" : "en";
}

export function getDefaultLang(): Lang {
  return "en";
}

export function setLang(l: Lang) {
  localStorage.setItem("lang", l);
  langListeners.forEach((fn) => fn());
}

export function subscribeLang(fn: () => void) {
  langListeners.add(fn);
  return () => {
    langListeners.delete(fn);
  };
}
