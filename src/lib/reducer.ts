import type { Cheatsheet, CheatsheetAction, Section, Shortcut } from "./types";

function uid(): string {
  return crypto.randomUUID();
}

export function createEmptyCheatsheet(): Cheatsheet {
  return { id: crypto.randomUUID(), title: "My Cheatsheet", sections: [] };
}

export function cheatsheetReducer(state: Cheatsheet, action: CheatsheetAction): Cheatsheet {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.title };

    case "ADD_SECTION": {
      const section: Section = { id: uid(), name: action.name, shortcuts: [] };
      return { ...state, sections: [...state.sections, section] };
    }

    case "REMOVE_SECTION":
      return { ...state, sections: state.sections.filter((s) => s.id !== action.sectionId) };

    case "SET_ACTIVE_SECTION":
      return state;

    case "ADD_SHORTCUT": {
      const shortcut: Shortcut = { id: uid(), keys: action.keys, action: action.action };
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, shortcuts: [...s.shortcuts, shortcut] } : s,
        ),
      };
    }

    case "UPDATE_SHORTCUT":
      return {
        ...state,
        sections: state.sections.map((s) => ({
          ...s,
          shortcuts: s.shortcuts.map((sc) =>
            sc.id === action.shortcutId ? { ...sc, keys: action.keys, action: action.action } : sc,
          ),
        })),
      };

    case "REMOVE_SHORTCUT":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId
            ? { ...s, shortcuts: s.shortcuts.filter((sc) => sc.id !== action.shortcutId) }
            : s,
        ),
      };

    case "LOAD":
      return action.cheatsheet;

    default:
      return state;
  }
}
