import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { cheatsheetReducer, createEmptyCheatsheet } from "../lib/reducer";
import { migrateLegacyData } from "../lib/storage";
import type { Cheatsheet, CheatsheetMeta } from "../lib/types";

interface AppState {
  list: CheatsheetMeta[];
  cheatsheets: Record<string, Cheatsheet>;
  activeId: string | null;
  darkMode: boolean;
  sidebarOpen: boolean;
  editorVisible: boolean;
  activeSectionId: string | null;
  hydrated: boolean;

  init: () => void;
  newCheatsheet: () => void;
  switchTo: (id: string) => void;
  rename: (id: string, title: string) => void;
  remove: (id: string) => void;
  setTitle: (title: string) => void;
  addSection: (name: string) => void;
  removeSection: (sectionId: string) => void;
  addShortcut: (sectionId: string, keys: string, action: string) => void;
  updateShortcut: (shortcutId: string, keys: string, action: string) => void;
  removeShortcut: (shortcutId: string, sectionId: string) => void;
  setActiveSection: (sectionId: string | null) => void;
  toggleSidebar: () => void;
  toggleEditor: () => void;
  toggleDark: () => void;
}

function applyToActive(
  state: AppState,
  action: Parameters<typeof cheatsheetReducer>[1],
): Partial<AppState> {
  const active = state.activeId ? state.cheatsheets[state.activeId] : null;
  if (!active) return {};
  const next = cheatsheetReducer(active, action);
  return {
    cheatsheets: { ...state.cheatsheets, [active.id]: next },
    activeSectionId:
      action.type === "ADD_SECTION"
        ? next.sections[next.sections.length - 1]?.id ?? null
        : state.activeSectionId,
  };
}

function patchListMeta(list: CheatsheetMeta[], cheatsheet: Cheatsheet): CheatsheetMeta[] {
  const meta: CheatsheetMeta = {
    id: cheatsheet.id,
    title: cheatsheet.title,
    updatedAt: Date.now(),
  };
  const idx = list.findIndex((m) => m.id === cheatsheet.id);
  if (idx === -1) return [...list, meta];
  const updated = [...list];
  updated[idx] = meta;
  return updated;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      list: [],
      cheatsheets: {},
      activeId: null,
      darkMode: false,
      sidebarOpen: false,
      editorVisible: false,
      activeSectionId: null,
      hydrated: false,

      init: () => {
        const migrated = migrateLegacyData();
        if (migrated.length > 0) {
          const cheatsheets: Record<string, Cheatsheet> = {};
          for (const c of migrated) cheatsheets[c.id] = c;
          set({
            cheatsheets,
            list: migrated.map((c) => ({
              id: c.id,
              title: c.title,
              updatedAt: Date.now(),
            })),
            activeId: get().activeId ?? migrated[0].id,
          });
        }
        set({ hydrated: true });
      },

      newCheatsheet: () => {
        const fresh = createEmptyCheatsheet();
        set((s) => ({
          cheatsheets: { ...s.cheatsheets, [fresh.id]: fresh },
          list: [...s.list, { id: fresh.id, title: fresh.title, updatedAt: Date.now() }],
          activeId: fresh.id,
          activeSectionId: null,
          sidebarOpen: false,
        }));
      },

      switchTo: (id) => {
        if (id === get().activeId) return;
        set({
          activeId: id,
          activeSectionId: null,
          sidebarOpen: false,
        });
      },

      rename: (id, title) =>
        set((s) => {
          const cheatsheet = s.cheatsheets[id];
          if (!cheatsheet) return {};
          const renamed = { ...cheatsheet, title };
          return {
            cheatsheets: { ...s.cheatsheets, [id]: renamed },
            list: patchListMeta(s.list, renamed),
          };
        }),

      remove: (id) =>
        set((s) => {
          const cheatsheets = { ...s.cheatsheets };
          delete cheatsheets[id];
          const list = s.list.filter((m) => m.id !== id);
          let activeId = s.activeId;
          let activeSectionId = s.activeSectionId;
          if (id === s.activeId) {
            const next = list[0];
            activeId = next ? next.id : null;
            activeSectionId = null;
          }
          return { cheatsheets, list, activeId, activeSectionId };
        }),

      setTitle: (title) =>
        set((s) => {
          const active = s.activeId ? s.cheatsheets[s.activeId] : null;
          if (!active) return {};
          const updated = { ...active, title };
          return {
            cheatsheets: { ...s.cheatsheets, [active.id]: updated },
            list: patchListMeta(s.list, updated),
          };
        }),

      addSection: (name) => set((s) => applyToActive(s, { type: "ADD_SECTION", name })),

      removeSection: (sectionId) =>
        set((s) => {
          const result = applyToActive(s, { type: "REMOVE_SECTION", sectionId });
          const active = s.activeId ? s.cheatsheets[s.activeId] : null;
          const stillExists = active?.sections.some((sec) => sec.id === sectionId);
          return {
            ...result,
            activeSectionId: stillExists ? s.activeSectionId : null,
          };
        }),

      addShortcut: (sectionId, keys, action) =>
        set((s) => applyToActive(s, { type: "ADD_SHORTCUT", sectionId, keys, action })),

      updateShortcut: (shortcutId, keys, action) =>
        set((s) => applyToActive(s, { type: "UPDATE_SHORTCUT", shortcutId, keys, action })),

      removeShortcut: (shortcutId, sectionId) =>
        set((s) => applyToActive(s, { type: "REMOVE_SHORTCUT", shortcutId, sectionId })),

      setActiveSection: (sectionId) => set({ activeSectionId: sectionId }),

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      toggleEditor: () => set((s) => ({ editorVisible: !s.editorVisible })),

      toggleDark: () =>
        set((s) => {
          const darkMode = !s.darkMode;
          try {
            localStorage.setItem("theme", darkMode ? "dark" : "light");
            document.documentElement.classList.toggle("dark", darkMode);
          } catch (e) {}
          return { darkMode };
        }),
    }),
    {
      name: "cheatsheet-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        list: s.list,
        cheatsheets: s.cheatsheets,
        activeId: s.activeId,
        darkMode: s.darkMode,
      }),
    },
  ),
);
