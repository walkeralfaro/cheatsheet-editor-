## ADDED Requirements

### Requirement: Form fields have name and id attributes

The keys input and action textarea in ShortcutCard SHALL include `name` and `id` attributes to satisfy browser form field identification requirements.

#### Scenario: Keys input has name and id
- **WHEN** the keys input is rendered in edit mode
- **THEN** it SHALL have a `name` attribute set to `"keys"` and an `id` attribute that includes the shortcut's unique identifier

#### Scenario: Action textarea has name and id
- **WHEN** the action textarea is rendered in edit mode
- **THEN** it SHALL have a `name` attribute set to `"action"` and an `id` attribute that includes the shortcut's unique identifier
