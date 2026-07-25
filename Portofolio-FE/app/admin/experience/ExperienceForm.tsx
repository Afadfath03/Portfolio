"use client";

import { useState, type FormEvent } from "react";
import { type Dict } from "../../i18n";
import FieldPair from "../components/FieldPair";
import ArrayEditor from "../components/ArrayEditor";

type Data = Dict["experience"];
type Item = Data["items"][number];

type Props = {
  en: Data;
  id: Data;
};

const emptyItem: Item = { role: "ROLE", company: "COMPANY", period: "2024 - NOW", desc: "Description", tags: [] };

export default function ExperienceForm({ en, id }: Props) {
  const [enTitle, setEnTitle] = useState(en.title);
  const [idTitle, setIdTitle] = useState(id.title);
  const [enHeading, setEnHeading] = useState(en.heading);
  const [idHeading, setIdHeading] = useState(id.heading);
  const [enItems, setEnItems] = useState(en.items);
  const [idItems, setIdItems] = useState(id.items);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/content/experience", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        en: { title: enTitle, heading: enHeading, items: enItems },
        id: { title: idTitle, heading: idHeading, items: idItems },
      }),
    });
    const data = await res.json();
    setStatus(data.ok ? "Saved" : data.error || "Error");
    setLoading(false);
  };

  const renderItem = (
    item: Item,
    update: (i: Item) => void,
  ) => (
    <div className="admin-stack-fields">
      <input value={item.role} onChange={(e) => update({ ...item, role: e.target.value })} placeholder="Role" />
      <input value={item.company} onChange={(e) => update({ ...item, company: e.target.value })} placeholder="Company" />
      <input value={item.period} onChange={(e) => update({ ...item, period: e.target.value })} placeholder="Period" />
      <textarea value={item.desc} onChange={(e) => update({ ...item, desc: e.target.value })} rows={3} placeholder="Description" />
      <input
        value={item.tags.join(", ")}
        onChange={(e) => update({ ...item, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
        placeholder="Tags (comma-separated)"
      />
    </div>
  );

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2>EDIT EXPERIENCE</h2>

      <FieldPair label="Title" enValue={enTitle} idValue={idTitle} onEnChange={setEnTitle} onIdChange={setIdTitle} />
      <FieldPair label="Heading" enValue={enHeading} idValue={idHeading} onEnChange={setEnHeading} onIdChange={setIdHeading} />

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
            renderItem={(item, _idx, update) => renderItem(item, update)}
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
            renderItem={(item, _idx, update) => renderItem(item, update)}
          />
        </div>
      </div>

      <button type="submit" disabled={loading}>{loading ? "SAVING…" : "SAVE"}</button>
      {status && <p className="admin-status">{status}</p>}
    </form>
  );
}
