# AGENTS.md - Portfolio Project

## Overview
This document provides guidance for agentic coding tasks in this Next.js 16 portfolio project. It covers build, lint, test workflows, code style conventions, and project-specific patterns.

## PROJECT STRUCTURE

Portfolio project containing a Next.js 16 portfolio website. All active development is in the `gemini/` subdirectory.

```
./
├── gemini/                    # Main Next.js portfolio project
└── README.md
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| **Portfolio source** | `./gemini/src/` | Next.js App Router |
| **Documentation** | `./gemini/AGENTS.md` | Comprehensive conventions |
| **Project context** | `./gemini/GEMINI.md` | Tech stack, features |
| **Config** | `./gemini/` root | `package.json`, `tsconfig.json`, `next.config.ts` |

## COMMANDS

```bash
cd gemini
npm run dev        # Development server (http://localhost:3000)
npm run build      # Production build
npm run lint       # Run ESLint
npm run analyze    # Bundle analysis
```

## NOTES

- Project uses strict TypeScript, React 19, Tailwind CSS v4
- All component conventions, code style, and patterns documented in `./gemini/AGENTS.md`
- DO NOT create additional AGENTS.md files in subdirectories—parent file is comprehensive
