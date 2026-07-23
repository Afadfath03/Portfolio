"use client";

type Props = {
  label: string;
  enValue: string;
  idValue: string;
  onEnChange: (v: string) => void;
  onIdChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
  onCheck?: () => void;
  checking?: boolean;
  checkResult?: "ok" | "error" | null;
};

export default function FieldPair({
  label,
  enValue,
  idValue,
  onEnChange,
  onIdChange,
  textarea = false,
  rows = 3,
  onCheck,
  checking,
  checkResult,
}: Props) {
  return (
    <div className="admin-field-group">
      <label className="admin-pair-label">{label}</label>
      <div className="admin-pair">
        <div className="admin-col">
          <label>EN</label>
          <div className="admin-input-wrap">
            {textarea ? (
              <textarea value={enValue} onChange={(e) => onEnChange(e.target.value)} rows={rows} />
            ) : (
              <input value={enValue} onChange={(e) => onEnChange(e.target.value)} />
            )}
            {checkResult === "ok" && <span className="admin-check-indicator ok">✓</span>}
            {checkResult === "error" && <span className="admin-check-indicator err">✗</span>}
          </div>
        </div>
        <div className="admin-sync-btns">
          <button type="button" title="Copy EN → ID" onClick={() => onIdChange(enValue)}>
            →
          </button>
          <button type="button" title="Copy ID → EN" onClick={() => onEnChange(idValue)}>
            ←
          </button>
        </div>
        <div className="admin-col">
          <label>ID</label>
          <div className="admin-input-wrap">
            {textarea ? (
              <textarea value={idValue} onChange={(e) => onIdChange(e.target.value)} rows={rows} />
            ) : (
              <input value={idValue} onChange={(e) => onIdChange(e.target.value)} />
            )}
            {checkResult === "ok" && <span className="admin-check-indicator ok">✓</span>}
            {checkResult === "error" && <span className="admin-check-indicator err">✗</span>}
          </div>
        </div>
        {onCheck && (
          <div className="admin-sync-btns">
            <button
              type="button"
              title="Check image"
              className="admin-check-btn"
              disabled={checking || (!enValue && !idValue)}
              onClick={onCheck}
            >
              {checking ? "…" : "🔗"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
