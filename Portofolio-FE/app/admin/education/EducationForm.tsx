"use client";

import { useState, type FormEvent } from "react";
import { type Dict } from "../../i18n";
import FieldPair from "../components/FieldPair";
import ArrayEditor from "../components/ArrayEditor";

type Data = Dict["education"];
type Item = Data["items"][number];

type Props = {
  en: Data;
  id: Data;
};

const emptyItem: Item = { degree: "DEGREE", school: "SCHOOL", year: "2024", desc: "Description" };

export default function EducationForm({ en, id }: Props) {
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
    const res = await fetch("/api/content/education", {
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
      <input value={item.degree} onChange={(e) => update({ ...item, degree: e.target.value })} placeholder="Degree" />
      <input value={item.school} onChange={(e) => update({ ...item, school: e.target.value })} placeholder="School" />
      <input value={item.year} onChange={(e) => update({ ...item, year: e.target.value })} placeholder="Year" />
      <textarea value={item.desc} onChange={(e) => update({ ...item, desc: e.target.value })} rows={3} placeholder="Description" />
    </div>
  );

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2>EDIT EDUCATION</h2>

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
