"use client";

import type { ReactNode } from "react";

type Props<T> = {
  items: T[];
  setItems: (items: T[]) => void;
  defaultItem: T;
  renderItem: (item: T, idx: number, update: (item: T) => void) => ReactNode;
  mirrorItems?: T[];
  setMirrorItems?: (items: T[]) => void;
  hideAdd?: boolean;
};

export default function ArrayEditor<T>({
  items,
  setItems,
  defaultItem,
  renderItem,
  mirrorItems,
  setMirrorItems,
  hideAdd,
}: Props<T>) {
  const add = () => {
    setItems([...items, { ...defaultItem }]);
    if (mirrorItems && setMirrorItems) {
      setMirrorItems([...mirrorItems, { ...defaultItem }]);
    }
  };
  const remove = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
    if (mirrorItems && setMirrorItems) {
      setMirrorItems(mirrorItems.filter((_, i) => i !== idx));
    }
  };
  const move = (idx: number, dir: -1 | 1) => {
    const next = [...items];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setItems(next);
  };

  return (
    <div className="admin-array">
      {items.map((item, idx) => (
        <div key={idx} className="admin-array-item">
          {renderItem(item, idx, (updated) => {
            const next = [...items];
            next[idx] = updated;
            setItems(next);
          })}
          <div className="admin-array-actions">
            <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}>
              ▲
            </button>
            <button type="button" onClick={() => move(idx, 1)} disabled={idx === items.length - 1}>
              ▼
            </button>
            <button type="button" className="admin-array-remove" onClick={() => remove(idx)}>
              ×
            </button>
          </div>
        </div>
      ))}
      {!hideAdd && (
        <button type="button" className="admin-add" onClick={add}>
          + ADD
        </button>
      )}
    </div>
  );
}
