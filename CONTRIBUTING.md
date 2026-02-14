# Contributing to Lakbai Web

This is an academic community-based project focused on building an itinerrary
generator with a navigation planner

Please read this entire guide before starting any work to ensure a smooth
contribution process.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [Understanding the Tech Stack](#understanding-the-tech-stack)
- [How to Contribute](#how-to-contribute)
  - [Reporting Issues](#reporting-issues)
  - [Suggesting Features](#suggesting-features)
  - [Code Contributions](#code-contributions)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Versioning and Releases](#versioning-and-releases)
  - [Semantic Versioning](#semantic-versioning)
  - [Updating CHANGELOG.md](#updating-changelogmd)
  - [Git Tagging](#git-tagging)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Getting Help](#getting-help)

---

## Code of Conduct

This is an academic project. We expect all contributors to:

- Be respectful and inclusive
- Provide constructive feedback
- Credit original authors when using their work
- Share knowledge and help others learn
- Communicate clearly about progress and blockers

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **A code editor** - We recommend [VS Code](https://code.visualstudio.com/)
- **A package manager** - npm (comes with Node.js), yarn, or pnpm

**For beginners:** If you're new to any of these tools, we recommend starting
with the official documentation and tutorials.

### Project Setup

1. **Fork the repository** (if you're an external contributor):
   - Click the "Fork" button on the GitHub repository page
   - This creates your own copy of the project

2. **Clone the repository:**

   ```bash
   # If you forked the repo:
   git clone https://github.com/YOUR-USERNAME/lakbai-web.git

   # If you're a team member:
   git clone https://github.com/lakbai-platform/lakbai-web.git

   cd lakbai-web
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The app should now be running at http://localhost:3000

5. **Verify everything works:**
   - Open http://localhost:3000 in your browser
   - You should see the Lakbai homepage
   - Try navigating to different pages

### Understanding the Tech Stack

- **TypeScript** - JavaScript with type safety
- **Next.js** - React framework for web applications
- **TailwindCSS** - Utility-first CSS framework
- **Mapbox GL** - Interactive maps

**For beginners:** Don't worry if you're not familiar with all of these. Start
with what you know and learn as you go. The team is here to help.

---

## How to Contribute

### Reporting Issues

Found a bug? Here's how to report it:

1. **Check if the issue already exists** in the
   [Issues tab](https://github.com/lakbai-platform/lakbai-web/issues)
2. If not, **create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce the bug
   - Expected behavior vs. actual behavior
   - Screenshots (if applicable)
   - Your environment (OS, browser, Node version)

### Suggesting Features

Have an idea? We'd love to hear it!

1. Open a new issue with the tag "feature request"
2. Describe:
   - What problem does this solve?
   - How should it work?
   - Any design mockups or examples

**Note:** Discuss major features with maintainers before starting work to ensure
alignment with project goals.

### Code Contributions

Ready to code? Great! Follow the [Development Workflow](#development-workflow)
below.

---

## Development Workflow

Follow these steps for every contribution:

### Step 1: Sync Your Local Repository

```bash
# Fetch all changes and prune deleted branches
git fetch -p

# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main
```

**Why?** This ensures you're working with the latest code and prevents merge
conflicts.

### Step 2: Create a New Branch

```bash
# Create and switch to a new branch
git switch -c type/short-description

# Example:
git switch -c feat/add-route-optimizer
```

**Branch naming:** See [Branching Strategy](#branching-strategy) below.

### Step 3: Make Your Changes

- Write clean, readable code
- Follow the [Coding Standards](#coding-standards)
- Test your changes locally
- Make focused, logical commits

### Step 4: Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "type(scope): description"

# Example:
git commit -m "feat(route-optimizer): add distance calculation"
```

**Commit messages:** See
[Commit Message Conventions](#commit-message-conventions) below.

### Step 5: Push Your Branch

```bash
# Push your branch to the remote repository
git push origin your-branch-name

# Example:
git push origin feat/add-route-optimizer
```

### Step 6: Create a Pull Request

1. Go to the repository on GitHub
2. Click "Pull requests" → "New pull request"
3. Select your branch
4. Fill out the PR template:
   - **Title:** Brief description of changes
   - **Description:** What, why, and how you changed
   - **Screenshots:** For UI changes
   - **Testing:** How you tested the changes
5. Add maintainers as reviewers
6. Submit the PR

### Step 7: Address Review Comments

- Maintainers will review your code
- Address any requested changes promptly
- Push updates to the same branch
- The PR will update automatically

### Step 8: After Merge

```bash
# Switch back to main
git checkout main

# Pull the merged changes
git pull origin main

# Delete your local branch (ONLY after it's merged!)
git branch -d your-branch-name
```

**⚠️ Important:** Only delete your branch after it's been merged. Otherwise,
you'll lose your work!

---

## Branching Strategy

### Main Branch

- `main` - Stable production code (protected)
- **Never work directly on main!**

### Branch Naming Convention

**Format:**

```
<type>/<short-description>
```

**Allowed Types:**

- `feat` - New feature or component
- `fix` - Bug fix
- `chore` - Maintenance tasks (dependencies, configs)
- `docs` - Documentation changes
- `refactor` - Code restructuring without feature changes
- `style` - Formatting, missing semicolons, etc.
- `test` - Adding or updating tests

**Description:**

- Use kebab-case (all lowercase with hyphens)
- Be descriptive but concise
- Max 3-4 words

**Examples:**

✅ Good:

```
feat/add-navbar
feat/user-authentication
fix/map-zoom-issue
chore/update-dependencies
docs/update-readme
refactor/split-chat-components
```

❌ Bad:

```
feature/navbar          # Wrong type name
fix/bug                 # Too vague
feat/Add_New_Feature    # Wrong case
feat/this-is-a-very-long-branch-name-that-goes-on-forever  # Too long
```

**Notes:**

- Delete branches locally after they're merged to keep your workspace clean
- Maintainers will delete remote branches after merging

---

## Commit Message Conventions

We follow the
[Conventional Commits specification](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type

**Required.** Must be one of:

- `feat` - New feature (user-facing)
- `fix` - Bug fix
- `chore` - Maintenance (not user-facing)
- `docs` - Documentation only
- `refactor` - Code restructuring
- `build` - Dependencies or build system
- `style` - Code formatting
- `test` - Adding tests
- `perf` - Performance improvements

### Scope

**Optional but recommended.** Indicates what part of the codebase is affected.

**Allowed scopes:**

- `<page-name>-page` - e.g., `chat-page`, `explore-page`
- `<page-name>-page-<section-name>-section` - e.g., `home-page-hero-section`
- `<component>` - e.g., `navbar`, `map-area`, `button`
- `<folder-name>` - e.g., `components`, `styles`, `public`
- `<dependency>` - e.g., `next`, `mapbox`, `tailwind`

**Rules:**

- Use the file/folder name for consistency
- Use kebab-case
- If multiple scopes are affected, use the outermost scope

### Description

**Required.** A brief summary of the change.

**Rules:**

- Use imperative, present tense ("add" not "added" or "adds")
- Don't capitalize the first letter
- No period at the end
- Max 72 characters

### Examples

✅ Good:

```
feat(navbar): add mobile menu toggle
fix(map-area): resolve zoom percentage display
chore(dependencies): update next to v15.2.0
docs(readme): add installation instructions
refactor(chat-page): split into section components
style(navbar): format with prettier
feat(chat-page-message-section): add message input field
build(tailwind): add custom color classes
```

❌ Bad:

```
Added navbar                           # Missing type and scope
feat: Navbar                          # Capitalized, past tense
fix(navbar): Fixed the bug.           # Past tense, ends with period
feature(navbar): add menu             # Wrong type name
feat(navbar, footer): add components  # Multiple scopes
```

### When to Commit?

- **Make commits granular** - One logical change per commit
- **Not too small** - "fix typo" for every typo is excessive
- **Not too large** - "complete home page" with 50 file changes is too big
- **Good rule of thumb** - If you can't describe the commit in one line, it's
  probably too big

### Breaking Changes

If your commit introduces a breaking change (changes that require users to
update their code):

```
feat(api)!: change authentication flow

BREAKING CHANGE: The authentication endpoint now requires OAuth2 instead of API keys.
```

**Note:** Breaking changes trigger a major/minor version bump.

---

## Pull Request Guidelines

### Before Creating a PR

- [ ] Code runs locally without errors
- [ ] No TypeScript errors (`npm run build`)
- [ ] No lint errors (if linter is configured)
- [ ] All changes are tested manually
- [ ] Code follows project conventions
- [ ] Commit messages follow conventions

### PR Structure

**Title:**

- Clear and descriptive
- Can mirror your main commit message

**Description:**

Include:

1. **What:** What changes did you make?
2. **Why:** Why were these changes necessary?
3. **How:** How did you implement them?
4. **Testing:** How did you test the changes?

**Screenshots/Videos:**

- **Required** for UI/component changes
- Before and after comparisons are helpful
- Annotate images if needed

### Example PR Description

```markdown
## What

Added a route optimizer feature that calculates the shortest path between
multiple waypoints.

## Why

Users need to plan efficient routes with multiple stops. This feature addresses
issue #45.

## How

- Implemented Dijkstra's algorithm for pathfinding
- Added UI controls in the map sidebar
- Integrated with Mapbox Directions API

## Testing

- Tested with 2, 5, and 10 waypoints
- Verified on Chrome, Firefox, and Safari
- Tested on mobile (iPhone and Android)

## Screenshots

[Attach screenshots here]
```

### PR Review Process

1. **Automated checks** - Must pass (if configured)
2. **Maintainer review** - Usually within 2-3 days
3. **Address feedback** - Make requested changes
4. **Approval** - Once approved, maintainer will merge
5. **Cleanup** - Branch is deleted after merge

### PR Etiquette

- **Respond promptly** to review comments
- **Be receptive** to feedback
- **Ask questions** if you don't understand a request
- **Don't force push** after review (unless specifically asked)
- **Keep PRs focused** - One feature/fix per PR

---

## Versioning and Releases

This project follows [Semantic Versioning](https://semver.org/) and maintains a
detailed [CHANGELOG.md](CHANGELOG.md) to track all notable changes.

### Semantic Versioning

We use semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `0.5.0`, `1.2.3`)

**Version Format:** `vMAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0) - Incompatible API changes, major breaking changes
- **MINOR** (0.1.0) - New features, backwards-compatible functionality
- **PATCH** (0.0.1) - Bug fixes, backwards-compatible fixes

**Special Note for Pre-1.0 versions (0.x.x):**

- **MINOR** (0.x.0) - Breaking changes in development phase
- **PATCH** (0.0.x) - New features and bug fixes

Once the project reaches 1.0.0, we'll follow strict semantic versioning.

**Examples:**

```
0.4.3 → 0.5.0  (Breaking: Component restructuring, import path changes)
0.5.0 → 0.5.1  (New feature: Add route optimizer)
0.5.1 → 0.5.2  (Bug fix: Fix map zoom issue)
1.0.0 → 2.0.0  (Breaking: Complete API redesign)
1.0.0 → 1.1.0  (Feature: Add user authentication)
1.1.0 → 1.1.1  (Fix: Resolve login bug)
```

### Updating CHANGELOG.md

The CHANGELOG follows the [Keep a Changelog](https://keepachangelog.com/)
format.

#### For Contributors

**You do NOT need to update version numbers or create releases.** Maintainers
handle versioning and tagging.

**What you SHOULD do:**

1. **Check if CHANGELOG needs updating** for your change:
   - ✅ **Update CHANGELOG if:**
     - Adding a new feature
     - Fixing a user-facing bug
     - Making breaking changes
     - Removing features
     - Deprecating functionality
   - ❌ **Skip CHANGELOG if:**
     - Internal refactoring (no behavior change)
     - Updating comments or documentation
     - Fixing typos in code
     - Small style/formatting changes

2. **Add your change to the `[Unreleased]` section:**

   ```markdown
   ## [Unreleased]

   ### Added

   - New route optimizer with multi-waypoint support
   - Distance calculation feature

   ### Fixed

   - Map zoom percentage now displays correctly
   ```

3. **Use the correct category:**
   - **Added** - New features
   - **Changed** - Changes to existing functionality
   - **Deprecated** - Features that will be removed
   - **Removed** - Features that were removed
   - **Fixed** - Bug fixes
   - **Security** - Security vulnerability fixes

4. **Write clear, user-focused descriptions:**

   ```markdown
   ✅ Good:

   - Added route optimization for multi-stop journeys
   - Fixed map zoom controls not responding on mobile

   ❌ Bad:

   - Updated RouteCalculator.ts
   - Fixed bug
   ```

5. **Mark breaking changes with BREAKING:**

   ```markdown
   ### Changed

   - **BREAKING:** Moved MapArea component to root components folder (update
     imports)
   - **BREAKING:** Changed authentication API to use OAuth2
   ```

#### Example Contribution Workflow

**Scenario:** You're adding a new feature to display route statistics.

1. Make your code changes
2. Before committing, update CHANGELOG.md:

   ```markdown
   ## [Unreleased]

   ### Added

   - Route statistics display showing distance, duration, and stops
   ```

3. Commit everything together:

   ```bash
   git add .
   git commit -m "feat(chat-page): add route statistics display"
   ```

4. Push and create PR (maintainers will handle versioning later)

### Git Tagging

**For Maintainers Only** - Contributors do not need to create tags.

#### When to Create a Release

Releases are created when:

- Accumulated enough changes in `[Unreleased]`
- Major feature is complete
- Critical bug fix needs deployment
- Scheduled release cycle (e.g., weekly/monthly)

#### Release Process for Maintainers

**Step 1: Determine Version Number**

Analyze changes in `[Unreleased]` section:

- Any breaking changes? → MINOR bump (pre-1.0) or MAJOR bump (post-1.0)
- Only new features? → PATCH bump (pre-1.0) or MINOR bump (post-1.0)
- Only bug fixes? → PATCH bump

**Step 2: Update CHANGELOG.md**

1. Move `[Unreleased]` content to new version section
2. Add release date
3. Update version links at bottom

```markdown
## [Unreleased]

## [0.6.0] - 2026-02-14

### Added

- Route optimizer with multi-waypoint support
- Distance calculation feature

### Fixed

- Map zoom percentage display

## [0.5.0] - 2026-02-14

...

[unreleased]:
  https://github.com/lakbai-platform/lakbai-web/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/lakbai-platform/lakbai-web/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/lakbai-platform/lakbai-web/compare/v0.4.3...v0.5.0
```

**Step 3: Commit and Tag**

```bash
# Stage CHANGELOG
git add CHANGELOG.md

# Commit version bump
git commit -m "chore: release v0.6.0"

# Create annotated tag (recommended)
git tag -a v0.6.0 -m "Release version 0.6.0"

# Push commit and tags
git push origin main
git push origin v0.6.0
# Or push all tags at once:
git push origin main --tags
```

**Step 4: Create GitHub Release**

1. Go to GitHub repository → Releases → "Draft a new release"
2. Select the tag you just created (e.g., `v0.6.0`)
3. Title: `v0.6.0` or `Version 0.6.0`
4. Description: Copy the CHANGELOG section for this version
5. Publish release

#### Tag Format

**Always use annotated tags** (not lightweight tags):

```bash
# ✅ Good - Annotated tag (includes metadata)
git tag -a v0.6.0 -m "Release version 0.6.0"

# ❌ Bad - Lightweight tag (no metadata)
git tag v0.6.0
```

**Why annotated tags?**

- Includes tagger name, email, and date
- Shows up in `git describe`
- Better for versioning and releases
- Required for signed releases

#### Viewing Tags

```bash
# List all tags
git tag

# List tags with messages
git tag -n

# Show tag details
git show v0.6.0

# List tags matching pattern
git tag -l "v0.5.*"
```

#### Deleting Tags (if needed)

```bash
# Delete local tag
git tag -d v0.6.0

# Delete remote tag
git push origin --delete v0.6.0
```

### Version Bump Checklist for Maintainers

- [ ] Review all changes in `[Unreleased]`
- [ ] Determine appropriate version number
- [ ] Move `[Unreleased]` content to new version section
- [ ] Add release date
- [ ] Update version comparison links
- [ ] Commit: `git commit -m "chore: release vX.Y.Z"`
- [ ] Create annotated tag: `git tag -a vX.Y.Z -m "Release version X.Y.Z"`
- [ ] Push commit: `git push origin main`
- [ ] Push tag: `git push origin vX.Y.Z` or `git push --tags`
- [ ] Create GitHub release with CHANGELOG excerpt
- [ ] Announce release (if applicable)

**Important:** Only maintainers should create tags and releases. Contributors
should focus on adding entries to the `[Unreleased]` section.

---

## Coding Standards

### TypeScript

- **Use strict TypeScript** - No `any` types unless absolutely necessary
- **Define interfaces** for complex data structures
- **Export types** that are used in multiple files

```typescript
// ✅ Good
interface RouteData {
  id: string;
  waypoints: Waypoint[];
  distance: number;
}

// ❌ Bad
const routeData: any = { ... };
```

### Naming Conventions

- **Variables & Functions:** camelCase

  ```typescript
  const userLocation = getCurrentLocation();
  function calculateDistance() {}
  ```

- **Files:** kebab-case

  ```
  map-area.tsx
  route-calculator.ts
  ```

- **Components:** PascalCase (file name must match component name)

  ```typescript
  // In file: MapArea.tsx
  export default function MapArea() {}
  ```

- **Constants:** UPPER_SNAKE_CASE
  ```typescript
  const MAX_WAYPOINTS = 10;
  const API_BASE_URL = 'https://api.example.com';
  ```

### Functions

- **Use regular functions** for components and top-level functions

  ```typescript
  // ✅ Good - Components
  export default function ChatArea() {
    return <div>...</div>;
  }

  // ✅ Good - Utilities
  export function calculateDistance(a: Point, b: Point) {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  }

  // ✅ Good - Callbacks
  const onClick = () => console.log("clicked");

  // ❌ Bad - Component as arrow function
  const ChatArea = () => <div>...</div>;
  ```

- **Full variable names** - Don't abbreviate for brevity
  ```typescript
  // ✅ Good
  const officersDirectory = getOfficers();
  // ❌ Bad
  const officersDir = getOfficers();
  ```

### Components

**Location:**

- **Reusable components** → `@/components/component-name/index.tsx`
- **Page-specific complex components** → `@/app/page-name/_sections/`
- **Simple sub-components** → Define below main component in same file

**Example structure:**

```
app/
  chat/
    page.tsx                    # Main page component
    _sections/
      chatbox/
        index.tsx               # Complex, page-specific component
      message-input/
        index.tsx
components/
  navbar/
    index.tsx                   # Reusable across multiple pages
  button/
    index.tsx
```

**Guidelines:**

- Component file name must match component name (PascalCase)
- One main export per file
- Keep page components lean - they should orchestrate sections
- Extract complex logic into utility functions

### Styling

- **Use Tailwind CSS** utility classes
- **Check `styles/globals.css`** for custom classes before adding your own
- **Avoid inline styles** unless absolutely necessary
- **Mobile-first** approach with responsive design

```tsx
// ✅ Good
<div className="flex items-center gap-4 md:gap-6 lg:gap-8">

// ❌ Bad
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
```

### Code Quality

**Do:**

- Write self-documenting code
- Keep functions small and focused
- Extract magic numbers into named constants
- Handle errors gracefully
- Add comments only for complex logic (why, not what)

**Don't:**

- Leave commented-out code
- Use `console.log` in production code
- Add unused imports or variables
- Duplicate code (DRY principle)
- Nest ternaries or deeply nest conditions

```typescript
// ✅ Good - Self-documenting
const isValidRoute = waypoints.length >= 2 && waypoints.length <= MAX_WAYPOINTS;

// ❌ Bad - Needs comments
const x = wp.length >= 2 && wp.length <= 10; // check if waypoints valid
```

### Dependencies

- **Do not add dependencies** without maintainer approval
- Justify why the dependency is needed
- Consider bundle size impact
- Check for security vulnerabilities

---

## Project Structure

```
lakbai-web/
├── app/                          # Next.js app router pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── chat/
│   │   ├── page.tsx             # Chat page (orchestrates sections)
│   │   └── _sections/           # Page-specific complex components
│   │       ├── chatbox/
│   │       │   └── index.tsx
│   │       └── journey-area/
│   │           └── index.tsx
│   ├── explore/
│   │   └── page.tsx
│   ├── hub/
│   │   └── page.tsx
│   └── journey/
│       └── page.tsx
├── components/                   # Reusable components
│   ├── MapArea.tsx              # Used across multiple pages
│   ├── Navbar.tsx
│   └── ui/                      # Generic UI components
├── styles/
│   └── globals.css              # Global styles & Tailwind config
├── public/                       # Static assets
├── CHANGELOG.md                  # Version history
├── CONTRIBUTING.md               # This file
└── README.md
```

**Key Principles:**

- **Pages** orchestrate sections and handle routing
- **Sections** (`_sections/`) are complex, page-specific components
- **Components** are reusable across multiple pages
- **Utilities** for shared logic (add `lib/` or `utils/` folder)

---

## Troubleshooting

### Common Issues

**Port 3000 already in use:**

```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**Module not found errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Git merge conflicts:**

1. Open files with conflicts
2. Look for `<<<<<<<`, `=======`, `>>>>>>>` markers
3. Keep the code you want, remove the markers
4. Stage and commit the resolved files

**TypeScript errors:**

```bash
# Check for errors without running
npm run build
```

### Still Stuck?

See [Getting Help](#getting-help) below.

---

## Getting Help

### Communication Channels

- **GitHub Issues** - For bugs and feature requests
- **Pull Request Comments** - For code review questions
- **Team Chat** (if applicable) - For general questions

### Best Practices

- **Search first** - Your question might already be answered
- **Be specific** - Include error messages, screenshots, code snippets
- **Share what you've tried** - Shows you're making effort
- **Stay responsive** - Reply to questions about your contribution
- **Communicate blockers** - If you can't complete work, let us know ASAP

### Response Times

- Issues: 1-3 days
- PR reviews: 2-5 days
- Questions: 1-2 days

**Note:** This is an academic project, so response times may vary during exam
periods or holidays.

---

## Additional Resources

### Learning Materials

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)

### Tools

- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [GitHub Desktop](https://desktop.github.com/) - For those who prefer GUI
- [Conventional Commits Extension](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) -
  VS Code extension

---

## Recognition

All contributors will be recognized in:

- Project documentation
- Release notes (when applicable)
- Academic publications (if applicable)

This is an academic endeavor, and proper attribution is important to us. Your
contributions help build a valuable learning resource for the community.

---

## Questions?

If anything in this guide is unclear, please:

1. Open an issue with the "documentation" label
2. Suggest improvements via PR
3. Ask in the team chat

Thank you for contributing to Lakbai! 🚀
