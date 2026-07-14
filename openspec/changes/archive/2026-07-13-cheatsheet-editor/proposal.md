## Why

Users need a quick, visual way to create keyboard shortcut cheatsheets that can be printed as PDFs. Existing tools are either too complex (full document editors) or too rigid (static templates). A lightweight web app with a visual editor and live preview fills this gap.

## What Changes

- New Astro + React + Tailwind v4 web application (`CheatsheetEditor`)
- Visual form-based editor for creating cheatsheets (JSON is hidden from the user)
- Live preview that renders the cheatsheet in real-time as the user edits
- Inline editing: click on rendered shortcuts/actions to edit them directly in the preview
- Print-to-PDF via `window.print()` with CSS `@media print` styling
- localStorage persistence (no backend)
- Cheatsheet data model: `{ title, sections: [{ name, shortcuts: [{ keys, action }] }] }`

## Capabilities

### New Capabilities
- `form-editor`: Visual editor with form-based input for title, sections, and keyboard shortcuts
- `live-preview`: Real-time rendered preview of the cheatsheet that updates on every edit
- `inline-editing`: Click-to-edit shortcuts and actions directly on the rendered preview
- `print-pdf`: Print cheatsheet to PDF using browser print dialog with custom print styles
- `local-persistence`: Save and load cheatsheets from browser localStorage

### Modified Capabilities

none

## Impact

- New project under `/home/walker/Documentos/CheatsheetEditor`
- Dependencies: Astro, React, Tailwind CSS v4
- No existing code affected (greenfield project)
- No backend or database changes
