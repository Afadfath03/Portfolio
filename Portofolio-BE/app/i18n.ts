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
    greeting: "LOREM IPSUM DOLOR",
    tagline: "Sit amet, consectetur adipiscing elit",
    sub: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: "",
  },
  about: {
    title: "ABOUT",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    stats: [
      { value: "00", label: "PLACEHOLDER" },
      { value: "00", label: "PLACEHOLDER" },
      { value: "0", label: "PLACEHOLDER" },
    ],
    image: "",
  },
  works: {
    title: "WORKS",
    items: [
      {
        tag: "WEB",
        name: "PLACEHOLDER PROJECT",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        image: "",
        links: [{ label: "LIVE", href: "#" }, { label: "REPO", href: "#" }],
      },
      {
        tag: "APP",
        name: "PLACEHOLDER PROJECT",
        desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
        image: "",
        links: [{ label: "LIVE", href: "#" }, { label: "REPO", href: "#" }],
      },
      {
        tag: "EXPERIMENT",
        name: "PLACEHOLDER PROJECT",
        desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "",
        links: [{ label: "LIVE", href: "#" }, { label: "REPO", href: "#" }],
      },
    ],
  },
  contact: {
    title: "CONTACT",
    heading: "Lorem ipsum dolor sit amet, consectetur",
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
    greeting: "LOREM IPSUM DOLOR",
    tagline: "Sit amet, consectetur adipiscing elit",
    sub: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    image: "",
  },
  about: {
    title: "TENTANG",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    stats: [
      { value: "00", label: "PLACEHOLDER" },
      { value: "00", label: "PLACEHOLDER" },
      { value: "0", label: "PLACEHOLDER" },
    ],
    image: "",
  },
  works: {
    title: "KARYA",
    items: [
      {
        tag: "WEB",
        name: "PLACEHOLDER PROJECT",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
        image: "",
        links: [{ label: "LIVE", href: "#" }, { label: "REPO", href: "#" }],
      },
      {
        tag: "APP",
        name: "PLACEHOLDER PROJECT",
        desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
        image: "",
        links: [{ label: "LIVE", href: "#" }, { label: "REPO", href: "#" }],
      },
      {
        tag: "EKSPERIMEN",
        name: "PLACEHOLDER PROJECT",
        desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "",
        links: [{ label: "LIVE", href: "#" }, { label: "REPO", href: "#" }],
      },
    ],
  },
  contact: {
    title: "KONTAK",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    links: [
      { label: "EMAIL", value: "hello@afadfath.dev", href: "mailto:hello@afadfath.dev" },
      { label: "GITHUB", value: "@afadfath", href: "https://github.com/afadfath" },
      { label: "LINKEDIN", value: "in/afadfath", href: "https://linkedin.com/in/afadfath" },
    ],
  },
};

export const dict: Record<Lang, Dict> = { en, id };
