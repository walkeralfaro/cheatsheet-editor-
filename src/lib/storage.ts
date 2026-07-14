import type { Cheatsheet, CheatsheetMeta } from "./types";

const INDEX_KEY = "cheatsheet:index";
const CHEATSHEET_PREFIX = "cheatsheet:";
const LEGACY_KEY = "cheatsheet";

export function loadCheatsheetList(): CheatsheetMeta[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CheatsheetMeta[];
  } catch {
    return [];
  }
}

export function saveCheatsheetList(list: CheatsheetMeta[]): void {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(list));
  } catch {
    console.warn("Failed to save cheatsheet index to localStorage");
  }
}

export function loadCheatsheetById(id: string): Cheatsheet | null {
  try {
    const raw = localStorage.getItem(CHEATSHEET_PREFIX + id);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || typeof parsed.id !== "string") return null;
    return parsed as Cheatsheet;
  } catch {
    return null;
  }
}

export function saveCheatsheetById(data: Cheatsheet): void {
  try {
    localStorage.setItem(CHEATSHEET_PREFIX + data.id, JSON.stringify(data));
  } catch {
    console.warn("Failed to save cheatsheet to localStorage");
  }
}

export function deleteCheatsheetById(id: string): void {
  try {
    localStorage.removeItem(CHEATSHEET_PREFIX + id);
  } catch {
    console.warn("Failed to remove cheatsheet from localStorage");
  }
}

export function migrateLegacyCheatsheet(): Cheatsheet | null {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    localStorage.removeItem(LEGACY_KEY);
    const cheatsheet: Cheatsheet = {
      id: crypto.randomUUID(),
      title: parsed.title || "My Cheatsheet",
      sections: parsed.sections || [],
    };
    saveCheatsheetById(cheatsheet);
    const meta: CheatsheetMeta = {
      id: cheatsheet.id,
      title: cheatsheet.title,
      updatedAt: Date.now(),
    };
    saveCheatsheetList([meta]);
    return cheatsheet;
  } catch {
    return null;
  }
}
