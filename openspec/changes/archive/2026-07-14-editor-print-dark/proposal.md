## Why

The editor panel leaks content instead of scrolling when sections grow long, the print output uses landscape orientation which wastes vertical space, and the app lacks a dark theme despite being a developer tool where dark mode is expected.

## What Changes

- **Editor scroll**: Fix the left column layout so `overflow-auto` on EditorPanel actually scrolls instead of overflowing the viewport
- **Print portrait**: Change `@page` size from landscape to portrait for better vertical fit
- **Dark theme**: Add a `.dark` CSS class that overrides all color tokens, a toggle button in the toolbar with an SVG sun/moon icon, and localStorage persistence for the preference

## Capabilities

### New Capabilities
- `visual-theme`: Dark mode support with toggleable theme and persistent preference

### Modified Capabilities
- `print-pdf`: Print orientation requirement changes from landscape to portrait

## Impact

- `src/styles/global.css`: Add `@variant dark (&.dark)` directive, `.dark` class with dark color token overrides; change print `@page size: landscape` to `size: portrait`
- `src/components/App.tsx`: Add `darkMode` state with localStorage persistence, `useEffect` to toggle `.dark` class on `<html>`; add `overflow-hidden` to left column wrapper
- `src/components/Toolbar.tsx`: Add `onToggleDark` prop and SVG sun/moon toggle button
