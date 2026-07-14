## Purpose

Allow users to manage multiple independent cheatsheets with the ability to create, switch, rename, and delete them via a sidebar navigation menu.

## Requirements

### Requirement: User can create a new cheatsheet
The system SHALL allow the user to create a new blank cheatsheet at any time. The current cheatsheet SHALL be auto-saved before creating the new one.

#### Scenario: Create new cheatsheet
- **WHEN** the user clicks "New" in the toolbar or sidebar
- **THEN** the current cheatsheet is auto-saved and a new empty cheatsheet is created and becomes active

### Requirement: User can switch between cheatsheets
The system SHALL provide a sidebar listing all cheatsheets. The user SHALL be able to click any cheatsheet in the sidebar to switch to it.

#### Scenario: Open sidebar
- **WHEN** the user clicks the hamburger (☰) button in the toolbar
- **THEN** a sidebar slides in showing all cheatsheets

#### Scenario: Switch cheatsheet
- **WHEN** the user clicks a different cheatsheet in the sidebar
- **THEN** the current cheatsheet is auto-saved, the selected cheatsheet is loaded, and the sidebar closes

### Requirement: User can rename a cheatsheet
The system SHALL allow the user to rename a cheatsheet from the sidebar.

#### Scenario: Rename cheatsheet
- **WHEN** the user clicks the rename option on a cheatsheet in the sidebar
- **THEN** an inline input appears to edit the name, and saving updates the cheatsheet title and persists the change

### Requirement: User can delete a cheatsheet
The system SHALL allow the user to delete a cheatsheet from the sidebar.

#### Scenario: Delete cheatsheet
- **WHEN** the user clicks delete on a cheatsheet in the sidebar
- **THEN** the cheatsheet is removed from localStorage and the sidebar; if it was active, the next available cheatsheet becomes active

### Requirement: Active cheatsheet is highlighted in sidebar
The system SHALL visually distinguish the active cheatsheet in the sidebar.

#### Scenario: Active highlight
- **WHEN** the sidebar is open
- **THEN** the currently active cheatsheet is highlighted with a distinct background or border
