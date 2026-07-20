"use client";

import { useState, type FormEvent } from "react";
import { saveContentPair } from "@/lib/actions";
import { type Dict } from "../../i18n";
import FieldPair from "../components/FieldPair";
import ArrayEditor from "../components/ArrayEditor";

type Data = Dict["works"];
type Item = Data["items"][number];

type Props = {
  en: Data;
  id: Data;
};

const emptyItem: Item = { tag: "TAG", name: "NAME", desc: "Description" };

export default function WorksForm({ en, id }: Props) {
  const [enTitle, setEnTitle] = useState(en.title);
  const [idTitle, setIdTitle] = useState(id.title);
  const [enItems, setEnItems] = useState(en.items);
  const [idItems, setIdItems] = useState(id.items);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveContentPair(
      "works",
      { title: enTitle, items: enItems },
      { title: idTitle, items: idItems }
    );
    setStatus(res.ok ? "Saved" : res.error || "Error");
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

      <div className="admin-pair">
        <div className="admin-col">
          <label>Items EN</label>
          <ArrayEditor
            items={enItems}
            setItems={setEnItems}
            mirrorItems={idItems}
            setMirrorItems={setIdItems}
            defaultItem={emptyItem}
            renderItem={(item, _idx, update) => (
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
              </div>
            )}
          />
        </div>
        <div className="admin-sync-btns admin-sync-btns-top">
          <button type="button" title="Copy EN → ID" onClick={() => setIdItems(structuredClone(enItems))}>
            →
          </button>
          <button type="button" title="Copy ID → EN" onClick={() => setEnItems(structuredClone(idItems))}>
            ←
          </button>
        </div>
        <div className="admin-col">
          <label>Items ID</label>
          <ArrayEditor
            items={idItems}
            setItems={setIdItems}
            hideAdd
            defaultItem={emptyItem}
            renderItem={(item, _idx, update) => (
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
