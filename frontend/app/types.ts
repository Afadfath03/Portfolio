// ponytail: defines the Dict shape matching backend API response.
// Must be kept in sync with backend/src/seed.ts if the data structure changes.

export type Dict = {
  nav: {
    home: string;
    about: string;
    works: string;
    contact: string;
  };
  hero: {
    greeting: string;
    tagline: string;
    sub: string;
    image: string;
  };
  about: {
    title: string;
    heading: string;
    body: string;
    stats: { value: string; label: string }[];
    image: string;
  };
  works: {
    title: string;
    items: { tag: string; name: string; desc: string; image: string }[];
  };
  contact: {
    title: string;
    heading: string;
    links: { label: string; value: string; href: string }[];
  };
};
