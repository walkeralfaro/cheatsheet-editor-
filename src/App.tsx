import { Routes, Route, Outlet, useNavigate, Link } from "react-router";
import { useEffect } from "react";
import CheatsheetSidebar from "./components/CheatsheetSidebar";
import CheatsheetRoute from "./routes/CheatsheetRoute";
import EditorEntry from "./routes/EditorEntry";
import Landing from "./routes/Landing";
import NotFound from "./routes/NotFound";
import Footer from "./components/Footer";
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
        <Link
          to="/"
          className="text-lg font-semibold text-text transition-colors hover:text-primary"
          title="Ir a la página de inicio"
        >
          Cheatsheet Editor
        </Link>
      </header>
      <CheatsheetSidebar onNew={handleNew} />
      {!sidebarOpen ? null : (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={toggleSidebar} />
      )}
      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
        <Outlet />
      </div>
      <Footer className="lg:hidden print:hidden" />
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route element={<Shell />}>
        <Route path="editor" element={<EditorEntry />} />
        <Route path="cheatsheet/:id" element={<CheatsheetRoute />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
