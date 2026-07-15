import type { Cheatsheet } from "./types";

const INDEX_KEY = "cheatsheet:index";
const CHEATSHEET_PREFIX = "cheatsheet:";
const LEGACY_KEY = "cheatsheet";

function readCheatsheet(id: string): Cheatsheet | null {
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

function removeKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/**
 * One-time migration of legacy localStorage data into the new single-store layout.
 * Reads the legacy index + per-id keys and the older single `cheatsheet` key,
 * returns all found cheatsheets, and removes the legacy keys.
 */
export function migrateLegacyData(): Cheatsheet[] {
  const found: Cheatsheet[] = [];
  const seen = new Set<string>();

  try {
    const indexRaw = localStorage.getItem(INDEX_KEY);
    if (indexRaw) {
      const index = JSON.parse(indexRaw);
      if (Array.isArray(index)) {
        for (const meta of index) {
          const id = typeof meta === "object" && meta ? meta.id : null;
          if (!id || seen.has(id)) continue;
          const cheatsheet = readCheatsheet(id);
          if (cheatsheet) {
            found.push(cheatsheet);
            seen.add(id);
          }
          removeKey(CHEATSHEET_PREFIX + id);
        }
      }
      removeKey(INDEX_KEY);
    }

    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw);
      if (parsed && typeof parsed === "object") {
        const cheatsheet: Cheatsheet = {
          id: crypto.randomUUID(),
          title: parsed.title || "My Cheatsheet",
          sections: parsed.sections || [],
        };
        found.push(cheatsheet);
      }
      removeKey(LEGACY_KEY);
    }
  } catch {
    /* ignore */
  }

  return found;
}
