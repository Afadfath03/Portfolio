// ponytail: flat dict. Move to next-intl only if strings > ~200 or plural/ICU needed.

export type Lang = "en" | "id";
export type SectionId = "home" | "about" | "stack" | "experience" | "education" | "works" | "contact";

export const sectionIds: SectionId[] = ["home", "about", "stack", "experience", "education", "works", "contact"];

const en = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    stack: "STACK",
    experience: "EXPERIENCE",
    education: "EDUCATION",
    works: "WORKS",
    contact: "CONTACT",
  },
  hero: {
    greeting: "AFAD FATH",
    tagline: "Ad Astra Per Aspera",
    sub: "Full-stack developer crafting digital experiences with clean code and bold design.",
    image: "",
  },
  about: {
    title: "ABOUT",
    heading: "A developer who builds with purpose",
    body: "I'm a full-stack developer focused on building modern web applications. I believe in writing clean, maintainable code and creating interfaces that are both functional and beautiful.",
    stats: [
      { value: "5+", label: "PROJECTS" },
      { value: "1+", label: "YEARS" },
      { value: "3+", label: "TECH STACKS" },
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
  stack: {
    title: "STACK",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    categories: [
      { name: "FRONTEND", icon: "square", items: ["React", "Next.js", "TypeScript", "HTML/CSS", "Tailwind"] },
      { name: "BACKEND", icon: "circle", items: ["Node.js", "Python", "SQLite", "PostgreSQL", "REST API"] },
      { name: "TOOLS", icon: "diamond", items: ["Git", "Docker", "Linux", "Figma", "VS Code"] },
      { name: "DESIGN", icon: "ring", items: ["Figma", "Adobe XD", "Framer", "Canva", "CSS Animations"] },
      { name: "DEVOPS", icon: "hexagon", items: ["Docker", "GitHub Actions", "Nginx", "Vercel", "Linux"] },
      { name: "TESTING", icon: "triangle", items: ["Jest", "Playwright", "Cypress", "React Testing Library"] },
      { name: "DATABASE", icon: "pill", items: ["MongoDB", "Redis", "Firebase", "Supabase", "Prisma"] },
      { name: "AI", icon: "star", items: ["OpenAI", "LangChain", "HuggingFace", "TensorFlow", "PyTorch"] },
    ],
  },
  experience: {
    title: "EXPERIENCE",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    items: [
      { role: "ROLE", company: "COMPANY", period: "2024 - NOW", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", tags: ["TAG1", "TAG2"] },
      { role: "ROLE", company: "COMPANY", period: "2023 - 2024", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.", tags: ["TAG1", "TAG2"] },
    ],
  },
  education: {
    title: "EDUCATION",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    items: [
      { degree: "DEGREE", school: "SCHOOL", year: "2024", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { degree: "DEGREE", school: "SCHOOL", year: "2023", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
    ],
  },
  contact: {
    title: "CONTACT",
    heading: "Let\u2019s build something great together \u2192 That bond is Nexus.",
    links: [
      { label: "EMAIL", value: "Afadfath03@gmail.com", href: "mailto:Afadfath03@gmail.com" },
      { label: "GITHUB", value: "@Afadfath03", href: "https://github.com/Afadfath03" },
      { label: "LINKEDIN", value: "in/afad-fath", href: "https://www.linkedin.com/in/afad-fath-687004252" },
    ],
  },
};

export type Dict = typeof en;

const id: Dict = {
  nav: {
    home: "BERANDA",
    about: "TENTANG",
    stack: "TECH STACK",
    experience: "PENGALAMAN",
    education: "PENDIDIKAN",
    works: "KARYA",
    contact: "KONTAK",
  },
  hero: {
    greeting: "AFAD FATH",
    tagline: "Ad Astra Per Aspera",
    sub: "Full-stack developer menciptakan pengalaman digital dengan kode bersih dan desain berani.",
    image: "",
  },
  about: {
    title: "TENTANG",
    heading: "Seorang developer yang membangun dengan tujuan",
    body: "Saya adalah full-stack developer yang fokus membangun aplikasi web modern. Saya percaya dalam menulis kode yang bersih dan mudah dirawat serta membuat antarmuka yang fungsional dan indah.",
    stats: [
      { value: "5+", label: "PROYEK" },
      { value: "1+", label: "TAHUN" },
      { value: "3+", label: "TECH STACK" },
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
  stack: {
    title: "TECH STACK",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    categories: [
      { name: "FRONTEND", icon: "square", items: ["React", "Next.js", "TypeScript", "HTML/CSS", "Tailwind"] },
      { name: "BACKEND", icon: "circle", items: ["Node.js", "Python", "SQLite", "PostgreSQL", "REST API"] },
      { name: "TOOLS", icon: "diamond", items: ["Git", "Docker", "Linux", "Figma", "VS Code"] },
      { name: "DESIGN", icon: "ring", items: ["Figma", "Adobe XD", "Framer", "Canva", "CSS Animations"] },
      { name: "DEVOPS", icon: "hexagon", items: ["Docker", "GitHub Actions", "Nginx", "Vercel", "Linux"] },
      { name: "TESTING", icon: "triangle", items: ["Jest", "Playwright", "Cypress", "React Testing Library"] },
      { name: "DATABASE", icon: "pill", items: ["MongoDB", "Redis", "Firebase", "Supabase", "Prisma"] },
      { name: "AI", icon: "star", items: ["OpenAI", "LangChain", "HuggingFace", "TensorFlow", "PyTorch"] },
    ],
  },
  experience: {
    title: "PENGALAMAN",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    items: [
      { role: "ROLE", company: "COMPANY", period: "2024 - NOW", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", tags: ["TAG1", "TAG2"] },
      { role: "ROLE", company: "COMPANY", period: "2023 - 2024", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.", tags: ["TAG1", "TAG2"] },
    ],
  },
  education: {
    title: "PENDIDIKAN",
    heading: "Lorem ipsum dolor sit amet, consectetur",
    items: [
      { degree: "DEGREE", school: "SCHOOL", year: "2024", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
      { degree: "DEGREE", school: "SCHOOL", year: "2023", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
    ],
  },
  contact: {
    title: "KONTAK",
    heading: "Mari bangun sesuatu yang hebat bersama \u2192 Ikatan itu adalah Nexus.",
    links: [
      { label: "EMAIL", value: "Afadfath03@gmail.com", href: "mailto:Afadfath03@gmail.com" },
      { label: "GITHUB", value: "@Afadfath03", href: "https://github.com/Afadfath03" },
      { label: "LINKEDIN", value: "in/afad-fath", href: "https://www.linkedin.com/in/afad-fath-687004252" },
    ],
  },
};

export const dict: Record<Lang, Dict> = { en, id };

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
