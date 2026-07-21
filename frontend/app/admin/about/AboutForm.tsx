"use client";

import { useState, useCallback, type FormEvent } from "react";
import { saveContentPair } from "../../api-client";
import { checkImageUrl } from "@/lib/checkImage";
import { type Dict } from "../../types";
import FieldPair from "../components/FieldPair";
import ArrayEditor from "../components/ArrayEditor";

type Data = Dict["about"];
type Stat = Data["stats"][number];

type Props = {
  en: Data;
  id: Data;
};

const emptyStat: Stat = { value: "0", label: "LABEL" };

export default function AboutForm({ en, id }: Props) {
  const [enTitle, setEnTitle] = useState(en.title);
  const [idTitle, setIdTitle] = useState(id.title);
  const [enHeading, setEnHeading] = useState(en.heading);
  const [idHeading, setIdHeading] = useState(id.heading);
  const [enBody, setEnBody] = useState(en.body);
  const [idBody, setIdBody] = useState(id.body);
  const [enStats, setEnStats] = useState(en.stats);
  const [idStats, setIdStats] = useState(id.stats);
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
      "about",
      { title: enTitle, heading: enHeading, body: enBody, stats: enStats, image: enImage },
      { title: idTitle, heading: idHeading, body: idBody, stats: idStats, image: idImage }
    );
    setStatus(res.ok ? "Saved" : res.error || "Error");
    setLoading(false);
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2>EDIT ABOUT</h2>

      <FieldPair
        label="Title"
        enValue={enTitle}
        idValue={idTitle}
        onEnChange={setEnTitle}
        onIdChange={setIdTitle}
      />

      <FieldPair
        label="Heading"
        enValue={enHeading}
        idValue={idHeading}
        onEnChange={setEnHeading}
        onIdChange={setIdHeading}
      />

      <FieldPair
        label="Body"
        enValue={enBody}
        idValue={idBody}
        onEnChange={setEnBody}
        onIdChange={setIdBody}
        textarea
        rows={8}
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

      <div className="admin-pair">
        <div className="admin-col">
          <label>Stats EN</label>
          <ArrayEditor
            items={enStats}
            setItems={setEnStats}
            mirrorItems={idStats}
            setMirrorItems={setIdStats}
            defaultItem={emptyStat}
            renderItem={(stat, _idx, update) => (
              <div className="admin-row">
                <input
                  value={stat.value}
                  onChange={(e) => update({ ...stat, value: e.target.value })}
                  placeholder="Value"
                />
                <input
                  value={stat.label}
                  onChange={(e) => update({ ...stat, label: e.target.value })}
                  placeholder="Label"
                />
              </div>
            )}
          />
        </div>
        <div className="admin-sync-btns admin-sync-btns-top">
          <button type="button" title="Copy EN → ID" onClick={() => setIdStats(structuredClone(enStats))}>
            →
          </button>
          <button type="button" title="Copy ID → EN" onClick={() => setEnStats(structuredClone(idStats))}>
            ←
          </button>
        </div>
        <div className="admin-col">
          <label>Stats ID</label>
          <ArrayEditor
            items={idStats}
            setItems={setIdStats}
            hideAdd
            defaultItem={emptyStat}
            renderItem={(stat, _idx, update) => (
              <div className="admin-row">
                <input
                  value={stat.value}
                  onChange={(e) => update({ ...stat, value: e.target.value })}
                  placeholder="Value"
                />
                <input
                  value={stat.label}
                  onChange={(e) => update({ ...stat, label: e.target.value })}
                  placeholder="Label"
                />
              </div>
            )}
          />
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "SAVING…" : "SAVE"}
      </button>
      {status && <p className="admin-status">{status}</p>}
    </form>
  );
}
