## 1. Project Setup

- [x] 1.1 Initialize Astro project with React + Tailwind v4
- [x] 1.2 Configure Tailwind CSS v4
- [x] 1.3 Create basic page layout (editor panel + preview panel)

## 2. Data Model & State

- [x] 2.1 Define cheatsheet TypeScript types (Cheatsheet, Section, Shortcut)
- [x] 2.2 Implement useReducer for cheatsheet state
- [x] 2.3 Wire add/remove/update actions for sections and shortcuts

## 3. Editor Panel

- [x] 3.1 Build title input field
- [x] 3.2 Build AddSectionForm component
- [x] 3.3 Build collapsible SectionList with section headers
- [x] 3.4 Build AddShortcutForm component (keys + action inputs)
- [x] 3.5 Implement section and shortcut removal
- [x] 3.6 Style editor panels with Tailwind

## 4. Live Preview

- [x] 4.1 Build LivePreview React component that reads from cheatsheet state
- [x] 4.2 Render sections with headers and shortcut cards
- [x] 4.3 Style preview with Tailwind (clean, card-based layout)

## 5. Inline Editing

- [x] 5.1 Add click-to-edit mode on ShortcutCard (switches to inline inputs)
- [x] 5.2 Handle save on blur and Enter, cancel on Escape
- [x] 5.3 Show edit indicator on hover
- [x] 5.4 Dispatch update action on save

## 6. localStorage Persistence

- [x] 6.1 Implement save function with 500ms debounce
- [x] 6.2 Implement load function on mount
- [x] 6.3 Implement "New cheatsheet" reset
- [x] 6.4 Handle empty state on first visit

## 7. Print to PDF

- [x] 7.1 Add "Print" button in toolbar
- [x] 7.2 Create `@media print` CSS styles
- [x] 7.3 Configure `@page` rules (landscape, margins)
- [x] 7.4 Hide editor and toolbar in print mode
- [x] 7.5 Add `page-break-inside: avoid` on sections
- [x] 7.6 Polish print typography and spacing

## 8. Polish & Refinement

- [x] 8.1 Responsive layout adjustments
- [x] 8.2 Keyboard shortcuts (Ctrl+N, Ctrl+P)
- [x] 8.3 Error states and edge cases
