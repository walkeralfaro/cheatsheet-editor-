import { useState } from "react";
import { useNavigate } from "react-router";
import type { CheatsheetMeta } from "../lib/types";
import { useAppStore } from "../store/useAppStore";

interface CheatsheetSidebarProps {
  onNew: () => void;
}

export default function CheatsheetSidebar({ onNew }: CheatsheetSidebarProps) {
  const list = useAppStore((s) => s.list);
  const activeCheatsheetId = useAppStore((s) => s.activeId);
  const switchTo = useAppStore((s) => s.switchTo);
  const rename = useAppStore((s) => s.rename);
  const remove = useAppStore((s) => s.remove);
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const navigate = useNavigate();

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const handleStartRename = (id: string, currentTitle: string) => {
    setRenamingId(id);
    setRenameValue(currentTitle);
  };

  const handleConfirmRename = () => {
    if (renamingId && renameValue.trim()) {
      rename(renamingId, renameValue.trim());
    }
    setRenamingId(null);
  };

  const handleSwitch = (id: string) => {
    if (id === activeCheatsheetId) {
      toggleSidebar();
      return;
    }
    switchTo(id);
    navigate("/cheatsheet/" + id);
    toggleSidebar();
  };

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={toggleSidebar} />
      )}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-surface shadow-lg transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-text">Cheatsheets</h2>
          <button
            onClick={toggleSidebar}
            className="cursor-pointer text-sm text-text-muted hover:text-text"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1 p-2">
          {list.map((meta: CheatsheetMeta) => (
            <div
              key={meta.id}
              className={`group flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                meta.id === activeCheatsheetId
                  ? "bg-primary/10 text-primary"
                  : "text-text hover:bg-surface-alt"
              }`}
            >
              {renamingId === meta.id ? (
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={handleConfirmRename}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleConfirmRename();
                    if (e.key === "Escape") setRenamingId(null);
                  }}
                  className="flex-1 rounded border border-primary bg-surface px-2 py-0.5 text-sm text-text outline-none"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => handleSwitch(meta.id)}
                  className="flex-1 text-left"
                >
                  {meta.title}
                </button>
              )}
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => handleStartRename(meta.id, meta.title)}
                  className="cursor-pointer text-xs text-text-muted hover:text-text"
                >
                  ✎
                </button>
                <button
                  onClick={() => remove(meta.id)}
                  className="cursor-pointer text-xs text-text-muted hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-2">
          <button
            onClick={onNew}
            className="w-full cursor-pointer rounded-md bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            + New cheatsheet
          </button>
        </div>
      </div>
    </>
  );
}
