"use client";

import { useState, useCallback, type FormEvent } from "react";
import { saveContentPair } from "@/lib/actions";
import { checkImageUrl } from "@/lib/checkImage";
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
  const [enImage, setEnImage] = useState(en.image || "");
  const [idImage, setIdImage] = useState(id.image || "");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<"ok" | "error" | null>(null);

  const handleCheck = useCallback(async () => {
    setChecking(true);
    setCheckResult(null);
    const [enOk, idOk] = await Promise.all([
      checkImageUrl(enImage),
      checkImageUrl(idImage),
    ]);
    setCheckResult(enOk && idOk ? "ok" : "error");
    setChecking(false);
  }, [enImage, idImage]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveContentPair(
      "hero",
      { greeting: enGreeting, tagline: enTagline, sub: enSub, image: enImage },
      { greeting: idGreeting, tagline: idTagline, sub: idSub, image: idImage }
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

      <FieldPair
        label="Image URL"
        enValue={enImage}
        idValue={idImage}
        onEnChange={setEnImage}
        onIdChange={setIdImage}
        onCheck={handleCheck}
        checking={checking}
        checkResult={checkResult}
      />

      <button type="submit" disabled={loading}>
        {loading ? "SAVING…" : "SAVE"}
      </button>
      {status && <p className="admin-status">{status}</p>}
    </form>
  );
}
