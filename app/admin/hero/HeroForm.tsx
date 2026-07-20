"use client";

import { useState, type FormEvent } from "react";
import { saveContentPair } from "@/lib/actions";
import { type Dict } from "../../i18n";
import FieldPair from "../components/FieldPair";

type Data = Dict["hero"];

type Props = {
  en: Data;
  id: Data;
};

export default function HeroForm({ en, id }: Props) {
  const [enGreeting, setEnGreeting] = useState(en.greeting);
  const [idGreeting, setIdGreeting] = useState(id.greeting);
  const [enTagline, setEnTagline] = useState(en.tagline);
  const [idTagline, setIdTagline] = useState(id.tagline);
  const [enSub, setEnSub] = useState(en.sub);
  const [idSub, setIdSub] = useState(id.sub);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveContentPair(
      "hero",
      { greeting: enGreeting, tagline: enTagline, sub: enSub },
      { greeting: idGreeting, tagline: idTagline, sub: idSub }
    );
    setStatus(res.ok ? "Saved" : res.error || "Error");
    setLoading(false);
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2>EDIT HERO</h2>

      <FieldPair
        label="Greeting"
        enValue={enGreeting}
        idValue={idGreeting}
        onEnChange={setEnGreeting}
        onIdChange={setIdGreeting}
      />

      <FieldPair
        label="Tagline"
        enValue={enTagline}
        idValue={idTagline}
        onEnChange={setEnTagline}
        onIdChange={setIdTagline}
      />

      <FieldPair
        label="Sub"
        enValue={enSub}
        idValue={idSub}
        onEnChange={setEnSub}
        onIdChange={setIdSub}
        textarea
        rows={4}
      />

      <button type="submit" disabled={loading}>
        {loading ? "SAVING…" : "SAVE"}
      </button>
      {status && <p className="admin-status">{status}</p>}
    </form>
  );
}
