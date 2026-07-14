## Why

The footer appears with a white background in dark mode on mobile, breaking the visual theme. On desktop, the footer stays pinned to the viewport bottom instead of scrolling with the EditorPanel content, making it feel floaty rather than part of the page.

## What Changes

- Add `bg-surface` to `<main>` and the mobile footer in `index.astro` so dark mode applies correctly
- Move the desktop footer from the left column's flex layout into `EditorPanel` so it scrolls with the editor content

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `visual-theme`: Ensure footer respects dark mode background color (`bg-surface`)

## Impact

- `src/pages/index.astro`: add `bg-surface` to `<main>` and mobile `<footer>`
- `src/components/App.tsx`: remove the desktop footer (lines 248–257)
- `src/components/EditorPanel.tsx`: add the desktop footer at the end of the scrollable content
