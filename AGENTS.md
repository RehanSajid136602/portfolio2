# AGENTS.md - Portfolio Project

## Overview
This document provides guidance for agentic coding tasks in this Next.js 16 portfolio project. It covers build, lint, test workflows, code style conventions, and project-specific patterns.

## Build, Lint, Test

### Build Commands
- Development: `npm run dev` (uses Next.js turbo mode)
- Production build: `npm run build`
- Start production server: `npm start`
- Bundle analysis: `npm run analyze`

### Lint Commands
- Run ESLint: `npm run lint`
- Project uses `eslint-config-next` with TypeScript support
- Configuration file: `eslint.config.mjs`

### Test Commands
- No test framework configured yet. When adding tests:
  - Use Jest or Vitest for unit tests
  - Run tests with: `npm test`
  - Run single test: `npm test -- --testNamePattern="test name"`

### Type Checking
- Strict TypeScript mode enabled in `tsconfig.json`
- Run type check via build: `npm run build` (includes type checking)
- Path alias: `@/*` maps to `./src/*`

## Code Style Guidelines

### Imports and Modules
- Use explicit named imports: `import { Foo, Bar } from 'module'`
- No wildcard imports
- Client components must have `"use client"` at the very top
- Import order: React hooks → external libraries → internal components/utils

### Formatting
- Uses ESLint + Next.js conventions
- Line length: ~100 characters recommended
- Use trailing commas in multi-line objects/arrays
- Use TypeScript strict mode - avoid `any`, prefer `unknown` if needed
- Always type function parameters and return values

### Naming Conventions
- Components: PascalCase (e.g., `Hero`, `RocketButton`)
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE for config values, camelCase for animation variants
- Types/interfaces: PascalCase with `Props` suffix for component props
- Boolean variables: `is*`, `has*`, `should*` prefix

### Error Handling
- Wrap async operations in try/catch
- Log errors with context: `console.error("Failed to copy:", err)`
- Handle clipboard and API errors gracefully with user feedback
- Reset state to idle on error (see `RocketButton.tsx:58`)

### Component Patterns
- Memoize components with `React.memo()` for performance
- Use `framer-motion` for animations with variants for complex sequences
- Extract animation variants to module-level constants (see `Hero.tsx:8-15`)
- Use Tailwind utility classes for styling
- Extract complex JSX patterns into separate components when reused
- Use `clsx` and `tailwind-merge` for conditional class handling

### File Organization
- Components: `src/components/[category]/[Name].tsx`
- Categories: `ui/`, `sections/`, `effects/`
- Lib utilities: `src/lib/`
- App routes: `src/app/`

### Accessibility
- Use semantic HTML elements
- Ensure interactive elements have proper states
- No ARIA attributes currently - add when needed

## Cursor Rules
No `.cursor/rules/` or `.cursorrules` files present.

## Copilot Rules
No `.github/copilot-instructions.md` file present.

## Quality Gates
- All changes must pass `npm run lint` before committing
- Production builds (`npm run build`) must succeed
- Avoid large rewrites without prior discussion
- Use descriptive commit messages

## Quick Start for Agents
1. Run `npm run dev` to start the development server
2. Use `npm run lint` to check code quality
3. The project uses React 19 with Next.js 16 App Router
4. All components are TypeScript with strict mode
5. Tailwind CSS v4 with PostCSS for styling

## Technology Stack
- Next.js 16.1.1 with App Router
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12
- ESLint 9
- Lucide React icons

## Contact
For questions, review `GEMINI.md` for project-specific context and decisions.
