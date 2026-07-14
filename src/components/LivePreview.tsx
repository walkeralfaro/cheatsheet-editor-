import type { Cheatsheet, CheatsheetAction } from "../lib/types";
import ShortcutCard from "./ShortcutCard";

interface LivePreviewProps {
  cheatsheet: Cheatsheet;
  dispatch: React.Dispatch<CheatsheetAction>;
  activeSectionId: string | null;
  onSectionClick: (sectionId: string) => void;
}

export default function LivePreview({ cheatsheet, dispatch, activeSectionId, onSectionClick }: LivePreviewProps) {
  if (cheatsheet.sections.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-text-muted">Add sections and shortcuts to see your cheatsheet.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-8 text-center text-3xl font-bold text-text">{cheatsheet.title}</h2>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
        {cheatsheet.sections.map((section) => (
          <div key={section.id} className="rounded-lg border border-border bg-surface shadow-sm">
            <div
              className="cursor-pointer rounded-t-lg border-b border-border bg-border px-4 py-3"
              onClick={() => onSectionClick(section.id)}
            >
              <h3 className="text-lg font-semibold text-text">{section.name}</h3>
            </div>

            {section.shortcuts.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-text-muted">
                No shortcuts in this section.
              </p>
            ) : (
              <table className="w-full print:w-auto print:table-auto">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                    <th className="w-2/5 px-4 py-2 print:w-auto">Keys</th>
                    <th className="w-3/5 px-4 py-2 print:w-auto">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {section.shortcuts.map((shortcut) => (
                    <ShortcutCard
                      key={shortcut.id}
                      shortcut={shortcut}
                      sectionId={section.id}
                      dispatch={dispatch}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
