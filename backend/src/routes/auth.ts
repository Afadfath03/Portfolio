import { Router, type Request, type Response } from "express";
import { verifyPassword, signSession, verifySession } from "../auth.js";

export const authRouter = Router();

const COOKIE_NAME = "admin_session";

// POST /api/auth/login
authRouter.post("/login", (req: Request, res: Response) => {
  const { password } = req.body || {};
  if (!verifyPassword(password)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = signSession();
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  res.json({ ok: true });
});

// POST /api/auth/logout
authRouter.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME, { path: "/admin" });
  res.json({ ok: true });
});

// GET /api/auth/check
authRouter.get("/check", (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAME] || "";
  if (!verifySession(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({ ok: true });
});
