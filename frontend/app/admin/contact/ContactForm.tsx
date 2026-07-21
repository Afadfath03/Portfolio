"use client";

import { useState, type FormEvent } from "react";
import { saveContentPair } from "../../api-client";
import { type Dict } from "../../types";
import FieldPair from "../components/FieldPair";
import ArrayEditor from "../components/ArrayEditor";

type Data = Dict["contact"];
type Link = Data["links"][number];

type Props = {
  en: Data;
  id: Data;
};

const emptyLink: Link = { label: "LABEL", value: "value", href: "https://" };

export default function ContactForm({ en, id }: Props) {
  const [enTitle, setEnTitle] = useState(en.title);
  const [idTitle, setIdTitle] = useState(id.title);
  const [enHeading, setEnHeading] = useState(en.heading);
  const [idHeading, setIdHeading] = useState(id.heading);
  const [enLinks, setEnLinks] = useState(en.links);
  const [idLinks, setIdLinks] = useState(id.links);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await saveContentPair(
      "contact",
      { title: enTitle, heading: enHeading, links: enLinks },
      { title: idTitle, heading: idHeading, links: idLinks }
    );
    setStatus(res.ok ? "Saved" : res.error || "Error");
    setLoading(false);
  };

  return (
    <form className="admin-form" onSubmit={submit}>
      <h2>EDIT CONTACT</h2>

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

      <div className="admin-pair">
        <div className="admin-col">
          <label>Links EN</label>
          <ArrayEditor
            items={enLinks}
            setItems={setEnLinks}
            mirrorItems={idLinks}
            setMirrorItems={setIdLinks}
            defaultItem={emptyLink}
            renderItem={(link, _idx, update) => (
              <div className="admin-stack">
                <input
                  value={link.label}
                  onChange={(e) => update({ ...link, label: e.target.value })}
                  placeholder="Label"
                />
                <input
                  value={link.value}
                  onChange={(e) => update({ ...link, value: e.target.value })}
                  placeholder="Value"
                />
                <input
                  value={link.href}
                  onChange={(e) => update({ ...link, href: e.target.value })}
                  placeholder="URL"
                />
              </div>
            )}
          />
        </div>
        <div className="admin-sync-btns admin-sync-btns-top">
          <button type="button" title="Copy EN → ID" onClick={() => setIdLinks(structuredClone(enLinks))}>
            →
          </button>
          <button type="button" title="Copy ID → EN" onClick={() => setEnLinks(structuredClone(idLinks))}>
            ←
          </button>
        </div>
        <div className="admin-col">
          <label>Links ID</label>
          <ArrayEditor
            items={idLinks}
            setItems={setIdLinks}
            hideAdd
            defaultItem={emptyLink}
            renderItem={(link, _idx, update) => (
              <div className="admin-stack">
                <input
                  value={link.label}
                  onChange={(e) => update({ ...link, label: e.target.value })}
                  placeholder="Label"
                />
                <input
                  value={link.value}
                  onChange={(e) => update({ ...link, value: e.target.value })}
                  placeholder="Value"
                />
                <input
                  value={link.href}
                  onChange={(e) => update({ ...link, href: e.target.value })}
                  placeholder="URL"
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
