# Gemini Context File (GEMINI.md)

## Project Overview

**Name:** `portfolio-gemini-3-flash`
**Type:** Next.js Web Application
**Description:** A high-performance portfolio website for Muhammad Rehan, a software engineer specializing in motion design. The project uses the latest Next.js 16 App Router and React 19.
**Key Features:**
*   **Visuals:** Dark mode aesthetic, custom fonts (Inter, JetBrains Mono), advanced motion effects (CursorStardust, Framer Motion).
*   **Performance:** Optimization hints, deferred scripts, bundle analysis.
*   **Architecture:** Component-based (Sections, UI, Effects), App Router structure.

## Technology Stack

*   **Framework:** Next.js 16.1.1 (App Router)
*   **Core:** React 19, TypeScript
*   **Styling:** Tailwind CSS v4, clsx, tailwind-merge
*   **Icons:** Lucide React
*   **Animation:** Framer Motion, Canvas Confetti
*   **Tooling:** ESLint, PostCSS, Bundle Analyzer

## Building and Running

*   **Install Dependencies:** `npm install`
*   **Development Server:** `npm run dev` (Runs on `http://localhost:3000`)
*   **Production Build:** `npm run build`
*   **Start Production:** `npm run start`
*   **Linting:** `npm run lint`
*   **Bundle Analysis:** `npm run analyze`

## Development Conventions

*   **File Structure:**
    *   `src/app`: App Router pages and layouts (`page.tsx`, `layout.tsx`).
    *   `src/components`: UI components organized by category (`ui`, `sections`, `effects`).
    *   `src/lib`: Utility functions and hooks (`utils.ts`, `animations.ts`).
    *   `.kiro`: Project specs and enhancement plans.
*   **Styling:** Use Tailwind CSS utility classes. Combine classes using `clsx` and `tailwind-merge` (via `cn` utility if available, or direct usage).
*   **Fonts:** Use CSS variables `--font-inter` and `--font-mono` defined in `layout.tsx`.
*   **Agent Rules (from AGENTS.md):**
    *   **Types:** Strict TypeScript usage. Avoid `any`. Define interfaces/types.
    *   **Formatting:** Prettier/ESLint rules apply.
    *   **Naming:** camelCase for variables/functions, PascalCase for components/types.
    *   **Imports:** Explicit imports, no wildcards.
    *   **Performance:** Prioritize readable code; optimize only after profiling.
*   **Enhancement Plan:** Follow specifications in `.kiro/specs/portfolio-enhancement/` for current development tasks.
