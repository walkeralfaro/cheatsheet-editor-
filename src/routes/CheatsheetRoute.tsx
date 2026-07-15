import { Navigate } from "react-router";
import { useAppStore } from "../store/useAppStore";
import Toolbar from "../components/Toolbar";
import EditorPanel from "../components/EditorPanel";
import LivePreview from "../components/LivePreview";

export default function CheatsheetRoute() {
  const id = useAppStore((s) => s.activeId);
  const active = useAppStore((s) => (s.activeId ? s.cheatsheets[s.activeId] : null));
  const editorVisible = useAppStore((s) => s.editorVisible);
  const setActiveSection = useAppStore((s) => s.setActiveSection);

  if (!id || !active) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="no-print flex w-full flex-col overflow-hidden border-border bg-surface lg:w-105 lg:min-w-90 lg:border-r">
        <Toolbar />
        <div className={`${editorVisible ? "flex" : "hidden"} min-h-0 flex-1 flex-col overflow-hidden lg:flex`}>
          <EditorPanel />
        </div>
      </div>
      <div className="print-area flex-1 overflow-auto bg-surface-alt p-4 lg:p-8">
        <LivePreview onSectionClick={setActiveSection} />
      </div>
    </>
  );
}
