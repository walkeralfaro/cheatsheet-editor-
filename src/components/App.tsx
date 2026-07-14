import { useReducer, useCallback, useEffect, useRef, useState } from "react";
import { cheatsheetReducer, createEmptyCheatsheet } from "../lib/reducer";
import {
  loadCheatsheetList,
  saveCheatsheetList,
  loadCheatsheetById,
  saveCheatsheetById,
  deleteCheatsheetById,
  migrateLegacyCheatsheet,
} from "../lib/storage";
import type { Cheatsheet, CheatsheetMeta } from "../lib/types";
import EditorPanel from "./EditorPanel";
import LivePreview from "./LivePreview";
import Toolbar from "./Toolbar";
import CheatsheetSidebar from "./CheatsheetSidebar";

function persistActiveCheatsheet(cheatsheet: Cheatsheet, list: CheatsheetMeta[]): CheatsheetMeta[] {
  saveCheatsheetById(cheatsheet);
  const updated = list.map((m) =>
    m.id === cheatsheet.id ? { ...m, title: cheatsheet.title, updatedAt: Date.now() } : m,
  );
  saveCheatsheetList(updated);
  return updated;
}

export default function App() {
  const [cheatsheetList, setCheatsheetList] = useState<CheatsheetMeta[]>([]);

  const [activeCheatsheetId, setActiveCheatsheetId] = useState<string | null>(null);

  const [cheatsheet, dispatch] = useReducer(cheatsheetReducer, createEmptyCheatsheet());

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [editorVisible, setEditorVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const isFirstRender = useRef(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);

    const list = loadCheatsheetList();
    if (list.length > 0) {
      setCheatsheetList(list);
      setActiveCheatsheetId(list[0].id);
    } else {
      const migrated = migrateLegacyCheatsheet();
      if (migrated) {
        const meta: CheatsheetMeta = { id: migrated.id, title: migrated.title, updatedAt: Date.now() };
        saveCheatsheetList([meta]);
        setCheatsheetList([meta]);
        setActiveCheatsheetId(migrated.id);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (cheatsheetList.length === 0) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const updated = persistActiveCheatsheet(cheatsheet, cheatsheetList);
      if (updated !== cheatsheetList) {
        setCheatsheetList(updated);
      }
    }, 500);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [cheatsheet]);

  useEffect(() => {
    if (activeCheatsheetId && cheatsheet.id !== activeCheatsheetId) {
      const loaded = loadCheatsheetById(activeCheatsheetId);
      if (loaded) {
        dispatch({ type: "LOAD", cheatsheet: loaded });
      }
    }
  }, [activeCheatsheetId]);

  const handleNew = useCallback(() => {
    if (cheatsheetList.length > 0) {
      saveCheatsheetById(cheatsheet);
    }
    const fresh = createEmptyCheatsheet();
    const meta: CheatsheetMeta = { id: fresh.id, title: fresh.title, updatedAt: Date.now() };
    const newList = [...cheatsheetList, meta];
    saveCheatsheetList(newList);
    saveCheatsheetById(fresh);
    setCheatsheetList(newList);
    setActiveCheatsheetId(fresh.id);
    dispatch({ type: "LOAD", cheatsheet: fresh });
    setActiveSectionId(null);
    setSidebarOpen(false);
  }, [cheatsheet, cheatsheetList]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleSwitch = useCallback(
    (id: string) => {
      if (id === activeCheatsheetId) return;
      saveCheatsheetById(cheatsheet);
      const meta = cheatsheetList.find((m) => m.id === id);
      if (meta) {
        const updatedList = cheatsheetList.map((m) =>
          m.id === cheatsheet.id ? { ...m, title: cheatsheet.title, updatedAt: Date.now() } : m,
        );
        saveCheatsheetList(updatedList);
        setCheatsheetList(updatedList);
      }
      setActiveCheatsheetId(id);
      setActiveSectionId(null);
      setSidebarOpen(false);
    },
    [activeCheatsheetId, cheatsheet, cheatsheetList],
  );

  const handleRename = useCallback(
    (id: string, title: string) => {
      const updatedList = cheatsheetList.map((m) =>
        m.id === id ? { ...m, title, updatedAt: Date.now() } : m,
      );
      saveCheatsheetList(updatedList);
      setCheatsheetList(updatedList);
      if (id === cheatsheet.id) {
        dispatch({ type: "SET_TITLE", title });
      }
    },
    [cheatsheetList, cheatsheet.id],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteCheatsheetById(id);
      const updatedList = cheatsheetList.filter((m) => m.id !== id);
      saveCheatsheetList(updatedList);
      setCheatsheetList(updatedList);
      if (id === activeCheatsheetId) {
        if (updatedList.length > 0) {
          const nextId = updatedList[0].id;
          setActiveCheatsheetId(nextId);
        } else {
          setCheatsheetList([]);
          setActiveCheatsheetId(null);
        }
      }
    },
    [activeCheatsheetId, cheatsheet],
  );

  const handleAddSection = useCallback(
    (name: string) => {
      const action = { type: "ADD_SECTION" as const, name };
      const newState = cheatsheetReducer(cheatsheet, action);
      dispatch(action);
      const newSection = newState.sections[newState.sections.length - 1];
      if (newSection) setActiveSectionId(newSection.id);
    },
    [cheatsheet],
  );

  const handleSectionClick = useCallback((sectionId: string) => {
    setActiveSectionId(sectionId);
  }, []);

  useEffect(() => {
    if (activeSectionId && !cheatsheet.sections.some((s) => s.id === activeSectionId)) {
      setActiveSectionId(null);
    }
  }, [cheatsheet.sections, activeSectionId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault();
        handleNew();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleNew, handlePrint]);

  return (
    <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
      <CheatsheetSidebar
        cheatsheetList={cheatsheetList}
        activeCheatsheetId={activeCheatsheetId}
        onSwitch={handleSwitch}
        onRename={handleRename}
        onDelete={handleDelete}
        onNew={handleNew}
        onClose={() => setSidebarOpen(false)}
        isOpen={sidebarOpen}
      />
      {!hydrated ? null : cheatsheetList.length === 0 ? (
        <div className="flex flex-1 items-center justify-center bg-surface-alt">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-text">Create your first cheatsheet</h2>
            <p className="mt-2 text-text-muted">
              Save and organize your keyboard shortcuts in one place.
            </p>
            <button
              onClick={handleNew}
              className="mt-6 cursor-pointer rounded-md bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
            >
              New Cheatsheet
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="no-print flex w-full flex-col overflow-hidden border-border bg-surface lg:w-105 lg:min-w-90 lg:border-r">
            <Toolbar
              onToggleSidebar={() => setSidebarOpen((v) => !v)}
              onPrint={handlePrint}
              editorVisible={editorVisible}
              onToggleEditor={() => setEditorVisible((v) => !v)}
              darkMode={darkMode}
              onToggleDark={() => setDarkMode((v) => !v)}
            />
            <div className={`${editorVisible ? "flex" : "hidden"} min-h-0 flex-1 flex-col overflow-hidden lg:flex`}>
              <EditorPanel
                cheatsheet={cheatsheet}
                dispatch={dispatch}
                activeSectionId={activeSectionId}
                onAddSection={handleAddSection}
                onSectionClick={handleSectionClick}
              />
            </div>
          </div>
          <div className="print-area flex-1 overflow-auto bg-surface-alt p-4 lg:p-8">
            <LivePreview
              cheatsheet={cheatsheet}
              dispatch={dispatch}
              activeSectionId={activeSectionId}
              onSectionClick={handleSectionClick}
            />
          </div>
        </>
      )}
    </div>
  );
}
