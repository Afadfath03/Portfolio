// ponytail: HMAC-SHA256 session, no session store needed.

import { createHmac } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const SESSION_SECRET = process.env.SESSION_SECRET || ADMIN_PASSWORD;

export function verifyPassword(input: string): boolean {
  return input === ADMIN_PASSWORD && ADMIN_PASSWORD.length > 0;
}

function signSession(): string {
  const payload = "admin";
  const sig = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifySession(token: string): boolean {
  if (!token || !SESSION_SECRET) return false;
  const [payload, sig] = token.split(".");
  if (payload !== "admin") return false;
  const expected = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return sig === expected;
}

export { signSession };
