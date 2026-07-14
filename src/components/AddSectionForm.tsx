import { useState } from "react";

interface AddSectionFormProps {
  onAdd: (name: string) => void;
}

export default function AddSectionForm({ onAdd }: AddSectionFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Section name"
        className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-primary"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        Add section
      </button>
    </form>
  );
}
