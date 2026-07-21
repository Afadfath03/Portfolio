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
    image: "",
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
    image: "",
  },
  works: {
    title: "WORKS",
    items: [
      {
        tag: "WEB",
        name: "PROJECT ONE",
        desc: "Placeholder project. A thing that solves a problem nobody admitted having.",
        image: "",
      },
      {
        tag: "APP",
        name: "PROJECT TWO",
        desc: "Placeholder project. Built backwards: the interface came first, the logic caught up.",
        image: "",
      },
      {
        tag: "EXPERIMENT",
        name: "PROJECT THREE",
        desc: "Placeholder project. Technically useless, aesthetically essential.",
        image: "",
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
    image: "",
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
    image: "",
  },
  works: {
    title: "KARYA",
    items: [
      {
        tag: "WEB",
        name: "PROYEK SATU",
        desc: "Proyek placeholder. Sesuatu yang menyelesaikan masalah yang tak diakui orang.",
        image: "",
      },
      {
        tag: "APP",
        name: "PROYEK DUA",
        desc: "Proyek placeholder. Dibangun terbalik: antarmuka dulu, logika menyusul.",
        image: "",
      },
      {
        tag: "EKSPERIMEN",
        name: "PROYEK TIGA",
        desc: "Proyek placeholder. Secara teknis tidak berguna, secara estetika wajib ada.",
        image: "",
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
