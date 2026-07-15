import { useState } from "react";
import { useAppStore } from "../store/useAppStore";

interface AddShortcutFormProps {
  sectionId: string;
}

export default function AddShortcutForm({ sectionId }: AddShortcutFormProps) {
  const addShortcut = useAppStore((s) => s.addShortcut);
  const [keys, setKeys] = useState("");
  const [action, setAction] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keys.trim() || !action.trim()) return;
    addShortcut(sectionId, keys.trim(), action.trim());
    setKeys("");
    setAction("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-md border border-border bg-surface-alt p-3">
      <span className="text-xs font-medium uppercase tracking-wide text-text-muted">New shortcut</span>
      <input
        type="text"
        value={keys}
        onChange={(e) => setKeys(e.target.value)}
        placeholder="e.g. Ctrl+C"
        maxLength={20}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm font-mono text-text outline-none focus:border-primary"
      />
      <textarea
        value={action}
        onChange={(e) => setAction(e.target.value)}
        placeholder="e.g. Copy"
        maxLength={50}
        rows={3}
        className="w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={!keys.trim() || !action.trim()}
        className="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add shortcut
      </button>
    </form>
  );
}
