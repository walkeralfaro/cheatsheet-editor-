## Why

The current dark theme uses a stone-based palette with warm brownish undertones. The user prefers the cooler, more neutral slate palette for a cleaner dark mode experience.

## What Changes

- Replace `.dark` block color values in `global.css` from stone equivalents to slate equivalents
- Update the inline FOUC-prevention script in `Layout.astro` to use the new dark surface color
- Update the `visual-theme` spec to reference the new slate hex values

## Capabilities

### New Capabilities
*(none)*

### Modified Capabilities
- `visual-theme`: Dark theme color values change from stone palette to slate palette

## Impact

- `src/styles/global.css`: `.dark` block — 7 color tokens updated
- `src/layouts/Layout.astro`: inline script — 1 hex value updated
- `openspec/specs/visual-theme/spec.md`: color references updated in scenario descriptions
