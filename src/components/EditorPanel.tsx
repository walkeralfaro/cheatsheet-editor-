import { useState } from "react";
import type { Cheatsheet, CheatsheetAction } from "../lib/types";
import AddSectionForm from "./AddSectionForm";
import AddShortcutForm from "./AddShortcutForm";
import SectionList from "./SectionList";

interface EditorPanelProps {
  cheatsheet: Cheatsheet;
  dispatch: React.Dispatch<CheatsheetAction>;
  activeSectionId: string | null;
  onAddSection: (name: string) => void;
  onSectionClick: (sectionId: string) => void;
}

export default function EditorPanel({
  cheatsheet,
  dispatch,
  activeSectionId,
  onAddSection,
  onSectionClick,
}: EditorPanelProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-4 lg:pb-0">
      <div className="flex flex-1 flex-col gap-4">
        <input
          type="text"
          value={cheatsheet.title}
          onChange={(e) => dispatch({ type: "SET_TITLE", title: e.target.value })}
          placeholder="Cheatsheet title"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-lg font-semibold text-text outline-none focus:border-primary"
        />

        <AddSectionForm onAdd={onAddSection} />

        <SectionList
          sections={cheatsheet.sections}
          dispatch={dispatch}
          activeSectionId={activeSectionId}
          onSectionClick={onSectionClick}
        />

        {activeSectionId ? (
          <AddShortcutForm
            sectionId={activeSectionId}
            dispatch={dispatch}
          />
        ) : (
          <p className="rounded-md border border-dashed border-border bg-surface-alt p-4 text-center text-sm text-text-muted">
            Select a section to add shortcuts
          </p>
        )}
      </div>
      <footer className="hidden border-t border-border px-3 py-2 text-center text-xs text-text-muted lg:flex lg:items-center lg:justify-center print:hidden">
        made with{" "}
        <svg viewBox="0 0 24 24" fill="currentColor" className="mx-1 inline-block h-3 w-3 text-red-500 align-middle">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {" "}by{" "}
        <a href="https://www.walkeralfaro.com" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary hover:underline">
          Walker Alfaro
        </a>
      </footer>
    </div>
  );
}
