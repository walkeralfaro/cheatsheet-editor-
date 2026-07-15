import { Routes, Route, Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import CheatsheetSidebar from "./components/CheatsheetSidebar";
import Home from "./routes/Home";
import CheatsheetRoute from "./routes/CheatsheetRoute";
import { useAppStore } from "./store/useAppStore";

function Shell() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const newCheatsheet = useAppStore((s) => s.newCheatsheet);
  const navigate = useNavigate();

  const handleNew = () => {
    newCheatsheet();
    const id = useAppStore.getState().activeId;
    if (id) navigate("/cheatsheet/" + id);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        handleNew();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        window.print();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNew]);

  return (
    <main className="flex h-dvh flex-col bg-surface">
      <header className="no-print flex items-center justify-between border-b border-border bg-surface px-6 py-3">
        <h1 className="text-lg font-semibold text-text">Cheatsheet Editor</h1>
      </header>
      <CheatsheetSidebar onNew={handleNew} />
      {!sidebarOpen ? null : (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={toggleSidebar} />
      )}
      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
        <Outlet />
      </div>
      <footer className="flex-shrink-0 border-t border-border bg-surface px-3 py-2 text-center text-xs text-text-muted lg:hidden print:hidden">
        made with{" "}
        <svg viewBox="0 0 24 24" fill="currentColor" className="mx-1 inline-block h-3 w-3 text-red-500 align-middle">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        {" "}by{" "}
        <a href="https://www.walkeralfaro.com" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary hover:underline">
          Walker Alfaro
        </a>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="cheatsheet/:id" element={<CheatsheetRoute />} />
      </Route>
    </Routes>
  );
}
