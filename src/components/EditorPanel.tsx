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
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
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
  );
}
