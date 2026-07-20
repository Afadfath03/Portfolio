import "server-only";

import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { dict, type Dict, type Lang } from "../app/i18n";

export type ContentKey = keyof Dict;

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "data/portfolio.db");

// Ensure data dir exists before opening DB
const dir = path.dirname(DB_PATH);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const db = new Database(DB_PATH);

const initStmt = db.prepare(`
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    section TEXT NOT NULL,
    lang TEXT NOT NULL,
    data TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now')),
    UNIQUE(section, lang)
  )
`);
initStmt.run();

const seed = () => {
  const count = db.prepare("SELECT COUNT(*) AS c FROM content").get() as { c: number };
  if (count.c > 0) return;

  const insert = db.prepare(
    "INSERT INTO content (section, lang, data) VALUES (?, ?, ?)"
  );

  const seedLang = (lang: Lang) => {
    const data = dict[lang];
    (Object.keys(data) as ContentKey[]).forEach((section) => {
      insert.run(section, lang, JSON.stringify(data[section]));
    });
  };

  seedLang("en");
  seedLang("id");
};

seed();

export function getAllContent(lang: Lang): Dict {
  const rows = db
    .prepare("SELECT section, data FROM content WHERE lang = ?")
    .all(lang) as { section: ContentKey; data: string }[];

  const out = {} as Dict;
  for (const { section, data } of rows) {
    (out as Record<ContentKey, unknown>)[section] = JSON.parse(data);
  }

  return out;
}

export function getSection<K extends ContentKey>(section: K, lang: Lang): Dict[K] {
  const row = db
    .prepare("SELECT data FROM content WHERE section = ? AND lang = ?")
    .get(section, lang) as { data: string } | undefined;

  if (!row) {
    // ponytail: fallback to dict seed if somehow missing
    return (dict[lang][section] as Dict[K]) ?? ({} as Dict[K]);
  }

  return JSON.parse(row.data) as Dict[K];
}

export function upsertContent<K extends ContentKey>(
  section: K,
  lang: Lang,
  data: Dict[K]
): void {
  db.prepare(
    `INSERT INTO content (section, lang, data, updated_at)
     VALUES (?, ?, ?, datetime('now'))
     ON CONFLICT(section, lang) DO UPDATE SET
       data = excluded.data,
       updated_at = excluded.updated_at`
  ).run(section, lang, JSON.stringify(data));
}

export function getAllSections(): { section: ContentKey; lang: Lang; updated_at: string }[] {
  return db
    .prepare("SELECT section, lang, updated_at FROM content ORDER BY section, lang")
    .all() as { section: ContentKey; lang: Lang; updated_at: string }[];
}
