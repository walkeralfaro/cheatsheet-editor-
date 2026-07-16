import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import type { Shortcut } from "../lib/types";
import { useAppStore } from "../store/useAppStore";

interface ShortcutCardProps {
  shortcut: Shortcut;
}

export default function ShortcutCard({ shortcut }: ShortcutCardProps) {
  const updateShortcut = useAppStore((s) => s.updateShortcut);
  const [editingKey, setEditingKey] = useState(false);
  const [editingAction, setEditingAction] = useState(false);
  const [editKeys, setEditKeys] = useState(shortcut.keys);
  const [editAction, setEditAction] = useState(shortcut.action);
  const keysRef = useRef<HTMLInputElement>(null);
  const actionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditKeys(shortcut.keys);
    setEditAction(shortcut.action);
  }, [shortcut.keys, shortcut.action]);

  useEffect(() => {
    if (editingKey && keysRef.current) keysRef.current.focus();
  }, [editingKey]);

  useEffect(() => {
    if (editingAction && actionRef.current) {
      actionRef.current.focus();
      const len = actionRef.current.value.length;
      actionRef.current.setSelectionRange(len, len);
      autoResize(actionRef.current);
    }
  }, [editingAction]);

  useEffect(() => {
    if (editingAction && actionRef.current) autoResize(actionRef.current);
  }, [editAction, editingAction]);

  const handleSave = (newKeys: string, newAction: string) => {
    if (!newKeys.trim() || !newAction.trim()) return;
    updateShortcut(shortcut.id, newKeys.trim(), newAction.trim());
  };

  const handleSaveKey = () => {
    if (!editKeys.trim()) {
      setEditKeys(shortcut.keys);
      setEditingKey(false);
      return;
    }
    handleSave(editKeys, shortcut.action);
    setEditingKey(false);
  };

  const handleSaveAction = () => {
    if (!editAction.trim()) {
      setEditAction(shortcut.action);
      setEditingAction(false);
      return;
    }
    handleSave(shortcut.keys, editAction);
    setEditingAction(false);
  };

  const handleCancelKey = () => {
    setEditKeys(shortcut.keys);
    setEditingKey(false);
  };

  const handleCancelAction = () => {
    setEditAction(shortcut.action);
    setEditingAction(false);
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleKeysKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (editingAction) {
        actionRef.current?.focus();
      } else {
        setEditingAction(true);
      }
    }
    if (e.key === "Escape") handleCancelKey();
  };

  const handleActionKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSaveAction();
    }
    if (e.key === "Escape") handleCancelAction();
  };

  return (
    <tr>
      <td
        className="group cursor-pointer border-b border-border p-2"
        onClick={() => setEditingKey(true)}
      >
        {editingKey ? (
          <input
            ref={keysRef}
            type="text"
            name="keys"
            id={"keys-" + shortcut.id}
            value={editKeys}
            onChange={(e) => setEditKeys(e.target.value)}
            onBlur={handleSaveKey}
            onKeyDown={handleKeysKeyDown}
            maxLength={20}
            className="w-full rounded border border-border bg-surface px-2 py-1 font-mono text-sm text-text outline-none focus:border-primary"
          />
        ) : (
          <>
            <span className="inline-block rounded-md bg-key-bg px-2 py-1 font-mono text-sm font-bold text-key-text transition-colors group-hover:bg-key-bg/80">
              {shortcut.keys}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingKey(true);
              }}
              className="ml-1 cursor-pointer text-xs text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
            >
              ✎
            </button>
          </>
        )}
      </td>
      <td
        className="group cursor-pointer border-b border-border p-2 text-sm text-text whitespace-pre-wrap"
        onClick={() => setEditingAction(true)}
      >
        {editingAction ? (
          <textarea
            ref={actionRef}
            name="action"
            id={"action-" + shortcut.id}
            value={editAction}
            onChange={(e) => setEditAction(e.target.value)}
            onBlur={handleSaveAction}
            onKeyDown={handleActionKeyDown}
            maxLength={50}
            className="w-full resize-none overflow-hidden rounded border border-border bg-surface px-2 py-1 text-sm text-text outline-none focus:border-primary"
          />
        ) : (
          <>
            <span className="transition-colors group-hover:bg-surface-alt/80">
              {shortcut.action}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingAction(true);
              }}
              className="ml-1 cursor-pointer text-xs text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
            >
              ✎
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
