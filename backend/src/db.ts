// ponytail: synchronous better-sqlite3 — no async needed.

import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { dict, type Dict, type Lang, type SectionId, sectionIds } from "./seed.js";

export type ContentKey = SectionId;

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), "data/portfolio.db");

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
    sectionIds.forEach((section) => {
      insert.run(section, lang, JSON.stringify((data as Record<string, unknown>)[section]));
    });
  };

  seedLang("en");
  seedLang("id");
};

seed();

export function getAllContent(lang: Lang): Record<string, unknown> {
  const rows = db
    .prepare("SELECT section, data FROM content WHERE lang = ?")
    .all(lang) as { section: string; data: string }[];

  const out: Record<string, unknown> = {};
  for (const { section, data } of rows) {
    out[section] = JSON.parse(data);
  }

  return out;
}

export function getSection(section: string, lang: Lang): unknown {
  const row = db
    .prepare("SELECT data FROM content WHERE section = ? AND lang = ?")
    .get(section, lang) as { data: string } | undefined;

  if (!row) {
    const fallback = dict[lang] as Record<string, unknown>;
    return fallback[section] ?? {};
  }

  return JSON.parse(row.data);
}

export function upsertContent(
  section: string,
  lang: Lang,
  data: unknown
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
