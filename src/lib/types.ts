export interface Shortcut {
  id: string;
  keys: string;
  action: string;
}

export interface Section {
  id: string;
  name: string;
  shortcuts: Shortcut[];
}

export interface Cheatsheet {
  id: string;
  title: string;
  sections: Section[];
}

export interface CheatsheetMeta {
  id: string;
  title: string;
  updatedAt: number;
}

export type CheatsheetAction =
  | { type: "SET_TITLE"; title: string }
  | { type: "ADD_SECTION"; name: string }
  | { type: "RENAME_SECTION"; sectionId: string; name: string }
  | { type: "REORDER_SECTIONS"; fromIndex: number; toIndex: number }
  | { type: "REMOVE_SECTION"; sectionId: string }
  | { type: "SET_ACTIVE_SECTION"; sectionId: string }
  | { type: "ADD_SHORTCUT"; sectionId: string; keys: string; action: string }
  | { type: "UPDATE_SHORTCUT"; shortcutId: string; keys: string; action: string }
  | { type: "REMOVE_SHORTCUT"; shortcutId: string; sectionId: string }
  | { type: "LOAD"; cheatsheet: Cheatsheet };
