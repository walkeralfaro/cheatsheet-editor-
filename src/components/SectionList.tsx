import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Section } from "../lib/types";
import { useAppStore } from "../store/useAppStore";
import ShortcutRow from "./ShortcutRow";

interface SectionListProps {
  sections: Section[];
  activeSectionId: string | null;
  onSectionClick: (sectionId: string) => void;
}

interface SectionCardProps {
  section: Section;
  isActive: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelect: () => void;
  onRemove: () => void;
}

function SectionCard({
  section,
  isActive,
  isCollapsed,
  onToggleCollapse,
  onSelect,
  onRemove,
}: SectionCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(section.name);
  const renameSection = useAppStore((s) => s.renameSection);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const startEdit = () => {
    setDraft(section.name);
    setEditing(true);
  };

  const commit = () => {
    renameSection(section.id, draft);
    setEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-md border ${
        isActive ? "border-primary" : "border-border"
      } bg-surface`}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          aria-label="Reorder section"
          className="cursor-grab touch-none text-xs text-text-muted transition-colors hover:text-text active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          ⠿
        </button>
        <button
          onClick={onToggleCollapse}
          className="cursor-pointer text-xs text-text-muted transition-colors hover:text-text"
        >
          {isCollapsed ? "▶" : "▼"}
        </button>
        {editing ? (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setEditing(false);
            }}
            className="flex-1 rounded border border-primary bg-surface px-2 py-0.5 text-sm text-text outline-none"
            autoFocus
          />
        ) : (
          <button
            onClick={onSelect}
            onDoubleClick={startEdit}
            className="flex-1 text-left text-sm font-medium text-text"
            title="Double-click to rename"
          >
            {section.name}
          </button>
        )}
        <span className="text-xs text-text-muted">{section.shortcuts.length}</span>
        {!editing && (
          <button
            onClick={startEdit}
            className="cursor-pointer text-xs text-text-muted transition-colors hover:text-text"
            aria-label="Rename section"
          >
            ✎
          </button>
        )}
        <button
          onClick={onRemove}
          className="cursor-pointer text-xs text-text-muted transition-colors hover:text-red-500"
          aria-label="Remove section"
        >
          ✕
        </button>
      </div>

      {!isCollapsed && (
        <div className="border-t border-border">
          {section.shortcuts.length === 0 ? (
            <p className="px-3 py-4 text-center text-xs text-text-muted">No shortcuts</p>
          ) : (
            section.shortcuts.map((shortcut) => (
              <ShortcutRow key={shortcut.id} shortcut={shortcut} sectionId={section.id} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function SectionList({ sections, activeSectionId, onSectionClick }: SectionListProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const removeSection = useAppStore((s) => s.removeSection);
  const reorderSections = useAppStore((s) => s.reorderSections);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = sections.findIndex((s) => s.id === active.id);
    const toIndex = sections.findIndex((s) => s.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;
    reorderSections(fromIndex, toIndex);
  };

  if (sections.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-muted">No sections yet. Add one above.</p>
    );
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              isActive={section.id === activeSectionId}
              isCollapsed={collapsed.has(section.id)}
              onToggleCollapse={() => toggleCollapse(section.id)}
              onSelect={() => onSectionClick(section.id)}
              onRemove={() => removeSection(section.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
