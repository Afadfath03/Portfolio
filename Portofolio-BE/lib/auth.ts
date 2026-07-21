import { createHmac } from "crypto";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const SESSION_SECRET = process.env.SESSION_SECRET || ADMIN_PASSWORD;

const COOKIE_NAME = "admin_session";

export async function verifyPassword(input: string): Promise<boolean> {
  return input === ADMIN_PASSWORD && ADMIN_PASSWORD.length > 0;
}

async function signSession(): Promise<string> {
  const payload = "admin";
  const sig = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export async function verifySession(token: string): Promise<boolean> {
  if (!token || !SESSION_SECRET) return false;
  const [payload, sig] = token.split(".");
  if (payload !== "admin") return false;
  const expected = createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return sig === expected;
}

export async function getSession(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSession();
  if (!token) return false;
  return verifySession(token);
}

export async function setSession(): Promise<void> {
  const token = await signSession();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
