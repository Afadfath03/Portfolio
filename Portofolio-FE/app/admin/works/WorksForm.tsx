"use client";

import { useState, useCallback, type FormEvent } from "react";
import { checkImageUrl } from "@/lib/checkImage";
import { type Dict } from "../../i18n";
import FieldPair from "../components/FieldPair";
import ArrayEditor from "../components/ArrayEditor";

type Data = Dict["works"];
type Item = Data["items"][number];

type Props = {
  en: Data;
  id: Data;
};

const emptyItem: Item = { tag: "TAG", name: "NAME", desc: "Description", image: "" };

export default function WorksForm({ en, id }: Props) {
  const [enTitle, setEnTitle] = useState(en.title);
  const [idTitle, setIdTitle] = useState(id.title);
  const [enItems, setEnItems] = useState(en.items);
  const [idItems, setIdItems] = useState(id.items);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkIdx, setCheckIdx] = useState<string | null>(null);
  const [checkResults, setCheckResults] = useState<Record<string, "ok" | "error">>({});

  const handleCheckItem = useCallback(async (key: string, url: string) => {
    setCheckIdx(key);
    const ok = await checkImageUrl(url);
    setCheckResults((prev) => ({ ...prev, [key]: ok ? "ok" : "error" }));
    setCheckIdx(null);
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/content/works", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        en: { title: enTitle, items: enItems },
        id: { title: idTitle, items: idItems },
      }),
    });
    const data = await res.json();
    setStatus(data.ok ? "Saved" : data.error || "Error");
    setLoading(false);
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2>EDIT WORKS</h2>

      <FieldPair
        label="Title"
        enValue={enTitle}
        idValue={idTitle}
        onEnChange={setEnTitle}
        onIdChange={setIdTitle}
      />

      <div className="admin-pair-2">
        <div className="admin-col">
          <label>Items EN</label>
          <ArrayEditor
            items={enItems}
            setItems={setEnItems}
            mirrorItems={idItems}
            setMirrorItems={setIdItems}
            defaultItem={emptyItem}
            renderSync={(idx) => (
              <button type="button" title="Copy EN → ID" onClick={() => { const next = [...idItems]; next[idx] = enItems[idx]; setIdItems(next); }}>→</button>
            )}
            renderItem={(item, _idx, update) => {
              const key = `en-${_idx}`;
              return (
              <div className="admin-stack">
                <input
                  value={item.tag}
                  onChange={(e) => update({ ...item, tag: e.target.value })}
                  placeholder="Tag"
                />
                <input
                  value={item.name}
                  onChange={(e) => update({ ...item, name: e.target.value })}
                  placeholder="Name"
                />
                <textarea
                  value={item.desc}
                  onChange={(e) => update({ ...item, desc: e.target.value })}
                  placeholder="Description"
                  rows={3}
                />
                <div className="admin-input-row">
                  <input
                    value={item.image || ""}
                    onChange={(e) => update({ ...item, image: e.target.value })}
                    placeholder="Image URL"
                  />
                  <button type="button" className="admin-check-btn" disabled={checkIdx === key} onClick={() => handleCheckItem(key, item.image || "")}>
                    {checkIdx === key ? "…" : "🔗"}
                  </button>
                  {checkResults[key] === "ok" && <span className="admin-check-ok">✓</span>}
                  {(checkResults[key] === "error" || !item.image) && <span className="admin-check-err">✗</span>}
                </div>
              </div>
              );
            }}
          />
        </div>
        <div className="admin-col">
          <label>Items ID</label>
          <ArrayEditor
            items={idItems}
            setItems={setIdItems}
            mirrorItems={enItems}
            setMirrorItems={setEnItems}
            hideAdd
            defaultItem={emptyItem}
            renderSync={(idx) => (
              <button type="button" title="Copy ID → EN" onClick={() => { const next = [...enItems]; next[idx] = idItems[idx]; setEnItems(next); }}>←</button>
            )}
            renderItem={(item, _idx, update) => {
              const key = `id-${_idx}`;
              return (
              <div className="admin-stack">
                <input
                  value={item.tag}
                  onChange={(e) => update({ ...item, tag: e.target.value })}
                  placeholder="Tag"
                />
                <input
                  value={item.name}
                  onChange={(e) => update({ ...item, name: e.target.value })}
                  placeholder="Name"
                />
                <textarea
                  value={item.desc}
                  onChange={(e) => update({ ...item, desc: e.target.value })}
                  placeholder="Description"
                  rows={3}
                />
                <div className="admin-input-row">
                  <input
                    value={item.image || ""}
                    onChange={(e) => update({ ...item, image: e.target.value })}
                    placeholder="Image URL"
                  />
                  <button type="button" className="admin-check-btn" disabled={checkIdx === key} onClick={() => handleCheckItem(key, item.image || "")}>
                    {checkIdx === key ? "…" : "🔗"}
                  </button>
                  {checkResults[key] === "ok" && <span className="admin-check-ok">✓</span>}
                  {(checkResults[key] === "error" || !item.image) && <span className="admin-check-err">✗</span>}
                </div>
              </div>
              );
            }}
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
