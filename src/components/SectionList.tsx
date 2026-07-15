import { useState } from "react";
import type { Section } from "../lib/types";
import { useAppStore } from "../store/useAppStore";
import ShortcutRow from "./ShortcutRow";

interface SectionListProps {
  sections: Section[];
  activeSectionId: string | null;
  onSectionClick: (sectionId: string) => void;
}

export default function SectionList({ sections, activeSectionId, onSectionClick }: SectionListProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const removeSection = useAppStore((s) => s.removeSection);

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (sections.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-muted">
        No sections yet. Add one above.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sections.map((section) => {
        const isActive = section.id === activeSectionId;
        const isCollapsed = collapsed.has(section.id);

        return (
          <div
            key={section.id}
            className={`rounded-md border ${
              isActive ? "border-primary" : "border-border"
            } bg-surface`}
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <button
                onClick={() => toggleCollapse(section.id)}
                className="cursor-pointer text-xs text-text-muted transition-colors hover:text-text"
              >
                {isCollapsed ? "▶" : "▼"}
              </button>
              <button
                onClick={() => onSectionClick(section.id)}
                className="flex-1 text-left text-sm font-medium text-text"
              >
                {section.name}
              </button>
              <span className="text-xs text-text-muted">{section.shortcuts.length}</span>
              <button
                onClick={() => removeSection(section.id)}
                className="cursor-pointer text-xs text-text-muted transition-colors hover:text-red-500"
              >
                ✕
              </button>
            </div>

            {!isCollapsed && (
              <div className="border-t border-border">
                {section.shortcuts.length === 0 ? (
                  <p className="px-3 py-4 text-center text-xs text-text-muted">No shortcuts</p>
                ) : (
                  section.shortcuts.map((shortcut) => (
                    <ShortcutRow
                      key={shortcut.id}
                      shortcut={shortcut}
                      sectionId={section.id}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
