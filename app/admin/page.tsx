"use client";

import { useState, type FormEvent } from "react";
import { login } from "@/lib/actions";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(password);
    setLoading(false);
    if (res?.error) setError(res.error);
  };

  return (
    <div className="admin-login">
      <h1>ADMIN</h1>
      <form className="admin-login-form" onSubmit={submit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button type="submit" disabled={loading}>
          ENTER
        </button>
      </form>
      {error && <p className="admin-error">{error}</p>}
    </div>
  );
}
