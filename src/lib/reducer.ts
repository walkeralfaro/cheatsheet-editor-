import type { Cheatsheet, CheatsheetAction, Section, Shortcut } from "./types";

function uid(): string {
  return crypto.randomUUID();
}

export function shortId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}

export function createEmptyCheatsheet(): Cheatsheet {
  return { id: shortId(), title: "My Cheatsheet", sections: [] };
}

export function cheatsheetReducer(state: Cheatsheet, action: CheatsheetAction): Cheatsheet {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.title };

    case "ADD_SECTION": {
      const section: Section = { id: uid(), name: action.name, shortcuts: [] };
      return { ...state, sections: [...state.sections, section] };
    }

    case "RENAME_SECTION":
      return {
        ...state,
        sections: state.sections.map((s) =>
          s.id === action.sectionId ? { ...s, name: action.name } : s,
        ),
      };

    case "REORDER_SECTIONS": {
      const { fromIndex, toIndex } = action;
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.sections.length ||
        toIndex >= state.sections.length
      ) {
        return state;
      }
      const sections = [...state.sections];
      const [moved] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, moved);
      return { ...state, sections };
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
