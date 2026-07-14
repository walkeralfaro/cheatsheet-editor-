## MODIFIED Requirements

### Requirement: Dark theme uses distinct color palette
The dark theme SHALL use a **stone-based** warm dark color palette that provides sufficient contrast for readability.

#### Scenario: Text remains readable in dark mode
- **WHEN** dark mode is active
- **THEN** text is light-colored (`#fafaf9`) against a dark background (`#0c0a09`) with adequate contrast ratios

### Requirement: Light theme uses warm neutral palette
The light theme SHALL use a stone-based warm neutral palette with no cool (blue/green) undertones.

#### Scenario: Light theme background appears neutral
- **WHEN** the page is displayed in light mode
- **THEN** the background color is `#fafaf9` (stone-50) — a warm off-white with no blue or green cast

### Requirement: All backgrounds respect theme
Every UI element SHALL use theme-aware background colors (`bg-surface`, `bg-surface-alt`, etc.) instead of hardcoded white or dark backgrounds.

#### Scenario: No hardcoded whites in dark mode
- **WHEN** dark mode is active
- **THEN** no element renders with `background-color: white` (all backgrounds are dark-themed)
