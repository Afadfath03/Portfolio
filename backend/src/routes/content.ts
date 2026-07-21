import { Router, type Request, type Response } from "express";
import { getAllContent, getSection, upsertContent } from "../db.js";
import { verifySession } from "../auth.js";

export const contentRouter = Router();

const COOKIE_NAME = "admin_session";

// GET /api/content — all sections for both languages
contentRouter.get("/", (_req: Request, res: Response) => {
  const en = getAllContent("en");
  const id = getAllContent("id");
  res.json({ en, id });
});

// GET /api/content/:section?lang=en|id
contentRouter.get("/:section", (req: Request, res: Response) => {
  const { section } = req.params;
  const lang = String(req.query.lang || "en");
  if (lang !== "en" && lang !== "id") {
    res.status(400).json({ error: "Invalid lang" });
    return;
  }
  const data = getSection(String(section), lang);
  res.json(data);
});

// PUT /api/content/:section — upsert (auth required)
contentRouter.put("/:section", (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAME] || "";
  if (!verifySession(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { section } = req.params;
  const { en, id } = req.body;
  if (!en || !id) {
    res.status(400).json({ error: "Body must include both 'en' and 'id'" });
    return;
  }

  try {
    upsertContent(String(section), "en", en);
    upsertContent(String(section), "id", id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});
