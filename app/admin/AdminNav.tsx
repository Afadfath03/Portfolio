"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions";

const sections = [
  { key: "hero", label: "HERO" },
  { key: "about", label: "ABOUT" },
  { key: "works", label: "WORKS" },
  { key: "contact", label: "CONTACT" },
];

export default function AdminNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin") {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <nav className="admin-nav">
          {sections.map((s) => {
            const href = `/admin/${s.key}`;
            const active = pathname === `/admin/${s.key}`;
            return (
              <Link
                key={s.key}
                href={href}
                className={`admin-nav-link ${active ? "active" : ""}`}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-tools">
          <button className="admin-logout" onClick={() => logout()}>
            LOGOUT
          </button>
        </div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}
