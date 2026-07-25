"use client";

import { useState, type FormEvent } from "react";
import { type Dict } from "../../i18n";
import FieldPair from "../components/FieldPair";
import ArrayEditor from "../components/ArrayEditor";

type Data = Dict["stack"];
type Category = Data["categories"][number];

type Props = {
  en: Data;
  id: Data;
};

const emptyCategory: Category = { name: "CATEGORY", icon: "square", items: ["ITEM"] };

export default function StackForm({ en, id }: Props) {
  const [enTitle, setEnTitle] = useState(en.title);
  const [idTitle, setIdTitle] = useState(id.title);
  const [enHeading, setEnHeading] = useState(en.heading);
  const [idHeading, setIdHeading] = useState(id.heading);
  const [enCategories, setEnCategories] = useState(en.categories);
  const [idCategories, setIdCategories] = useState(id.categories);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/content/stack", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        en: { title: enTitle, heading: enHeading, categories: enCategories },
        id: { title: idTitle, heading: idHeading, categories: idCategories },
      }),
    });
    const data = await res.json();
    setStatus(data.ok ? "Saved" : data.error || "Error");
    setLoading(false);
  };

  const renderCatItem = (
    cat: Category,
    update: (c: Category) => void,
  ) => (
    <div className="admin-row">
      <input
        value={cat.name}
        onChange={(e) => update({ ...cat, name: e.target.value })}
        placeholder="Category name"
      />
      <select
        value={cat.icon}
        onChange={(e) => update({ ...cat, icon: e.target.value as Category["icon"] })}
      >
        <option value="square">Square</option>
        <option value="circle">Circle</option>
        <option value="diamond">Diamond</option>
        <option value="ring">Ring</option>
        <option value="hexagon">Hexagon</option>
        <option value="triangle">Triangle</option>
        <option value="pill">Pill</option>
        <option value="star">Star</option>
      </select>
      <input
        value={cat.items.join(", ")}
        onChange={(e) =>
          update({
            ...cat,
            items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
          })
        }
        placeholder="Items (comma-separated)"
      />
    </div>
  );

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2>EDIT STACK</h2>

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

      <div className="admin-pair-2">
        <div className="admin-col">
          <label>Categories EN</label>
          <ArrayEditor
            items={enCategories}
            setItems={setEnCategories}
            mirrorItems={idCategories}
            setMirrorItems={setIdCategories}
            defaultItem={emptyCategory}
            renderSync={(idx) => (
              <button type="button" title="Copy EN → ID" onClick={() => { const next = [...idCategories]; next[idx] = enCategories[idx]; setIdCategories(next); }}>→</button>
            )}
            renderItem={(cat, _idx, update) => renderCatItem(cat, update)}
          />
        </div>
        <div className="admin-col">
          <label>Categories ID</label>
          <ArrayEditor
            items={idCategories}
            setItems={setIdCategories}
            mirrorItems={enCategories}
            setMirrorItems={setEnCategories}
            hideAdd
            defaultItem={emptyCategory}
            renderSync={(idx) => (
              <button type="button" title="Copy ID → EN" onClick={() => { const next = [...enCategories]; next[idx] = idCategories[idx]; setEnCategories(next); }}>←</button>
            )}
            renderItem={(cat, _idx, update) => renderCatItem(cat, update)}
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
