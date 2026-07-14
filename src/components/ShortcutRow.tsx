import type { Shortcut, CheatsheetAction } from "../lib/types";

interface ShortcutRowProps {
  shortcut: Shortcut;
  sectionId: string;
  dispatch: React.Dispatch<CheatsheetAction>;
}

export default function ShortcutRow({ shortcut, sectionId, dispatch }: ShortcutRowProps) {
  return (
    <div className="flex items-center gap-2 border-t border-border px-3 py-2">
      <span className="min-w-25 rounded bg-key-bg px-2 py-0.5 text-center font-mono text-xs font-medium text-key-text">
        {shortcut.keys}
      </span>
      <span className="flex-1 text-sm text-text">{shortcut.action}</span>
      <button
        onClick={() => dispatch({ type: "REMOVE_SHORTCUT", shortcutId: shortcut.id, sectionId })}
        className="cursor-pointer text-xs text-text-muted transition-colors hover:text-red-500"
      >
        ✕
      </button>
    </div>
  );
}
