## Context

The current editor shows the add-shortcut form only when a section is active, but there's no explicit validation or user feedback when no section exists. If the user removes the active section, the form simply disappears without guidance.

## Goals / Non-Goals

**Goals:**
- Hide the add-shortcut form when no section is selected
- Show a clear message guiding the user to create or select a section
- Ensure removing the active section clears the selection state
- Keep the form disabled-prevention pattern simple

**Non-Goals:**
- Backend validation (no backend exists)
- Multi-select or bulk operations
- Changes to the data model

## Decisions

1. **Conditional rendering** — The add-shortcut form is already conditionally rendered based on `activeSectionId`. The fix adds an explicit "No section selected" placeholder message when `activeSectionId` is null.

2. **Section removal resets active selection** — When the active section is removed, `activeSectionId` must be set to `null`. This is already partially handled but needs to be enforced in the `REMOVE_SECTION` reducer case and in the UI.

3. **Placeholder message** — A small info banner inside the editor panel: "Select a section or create one to add shortcuts." This is simpler than disabling/enabling form fields.

## Risks / Trade-offs

- **No risk** — This is a UI-only guard with no data model changes. Reverting is trivial.
