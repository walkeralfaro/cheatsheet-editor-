import { useAppStore } from "../store/useAppStore";
import AddSectionForm from "./AddSectionForm";
import AddShortcutForm from "./AddShortcutForm";
import Footer from "./Footer";
import SectionList from "./SectionList";

export default function EditorPanel() {
  const cheatsheet = useAppStore((s) => (s.activeId ? s.cheatsheets[s.activeId] : null));
  const activeSectionId = useAppStore((s) => s.activeSectionId);
  const setTitle = useAppStore((s) => s.setTitle);
  const addSection = useAppStore((s) => s.addSection);
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  if (!cheatsheet) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-4 lg:pb-0">
      <div className="flex flex-1 flex-col gap-4">
        <input
          type="text"
          value={cheatsheet.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Cheatsheet title"
          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-lg font-semibold text-text outline-none focus:border-primary"
        />

        <AddSectionForm onAdd={addSection} />

        <SectionList
          sections={cheatsheet.sections}
          activeSectionId={activeSectionId}
          onSectionClick={setActiveSection}
        />

        {activeSectionId ? (
          <AddShortcutForm sectionId={activeSectionId} />
        ) : (
          <p className="rounded-md border border-dashed border-border bg-surface-alt p-4 text-center text-sm text-text-muted">
            Select a section to add shortcuts
          </p>
        )}
      </div>
      <Footer className="hidden lg:flex lg:items-center lg:justify-center print:hidden" />
    </div>
  );
}
