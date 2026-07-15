import { Navigate } from "react-router";
import { useAppStore } from "../store/useAppStore";

export default function Home() {
  const list = useAppStore((s) => s.list);
  const activeId = useAppStore((s) => s.activeId);
  const hasActive = useAppStore((s) => (s.activeId ? Boolean(s.cheatsheets[s.activeId]) : false));

  if (list.length > 0) {
    const targetId = hasActive && activeId ? activeId : list[0].id;
    return <Navigate to={"/cheatsheet/" + targetId} replace />;
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-surface-alt">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text">Create your first cheatsheet</h2>
        <p className="mt-2 text-text-muted">
          Save and organize your keyboard shortcuts in one place.
        </p>
        <button
          onClick={() => useAppStore.getState().newCheatsheet()}
          className="mt-6 cursor-pointer rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
        >
          New Cheatsheet
        </button>
      </div>
    </div>
  );
}
