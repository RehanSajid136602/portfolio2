### Optimization & Refactoring Plan

**Objective:** Reduce bundle size, minimize main-thread blocking time, and improve Core Web Vitals (LCP, CLS, FID) by refactoring dependencies, animations, and rendering logic.

---

### Phase 1: Dependency Hygiene & Tree-Shaking (Immediate Impact)
*Goal: Drastically reduce initial JavaScript payload.*

1.  **Fix Icon Imports:** Refactor all `lucide-react` imports from `import { Icon } from 'lucide-react'` to subpath imports `import Icon from 'lucide-react/dist/esm/icons/icon'` to enable proper tree-shaking.
2.  **Remove Dead Code:** Uninstall `canvas-confetti` and remove any references in `package.json`.
3.  **Analyze Bundle:** Run `npm run analyze`. If the script is generic, install `@next/bundle-analyzer`, configure it in `next.config.js`, and identify any other hidden large chunks.
4.  **Optimize Framer Motion:**
    *   Replace `import { motion }` with `import { m }` (the minimal component).
    *   Wrap the application in `LazyMotion` features={`domAnimation`}. This strips physics and drag logic (~30KB reduction).
    *   **Action:** Audit all simple fade/slide animations. If they do not require layout measuring, replace them with standard CSS transitions or Tailwind utility classes.

### Phase 2: Animation Performance & DOM Architecture
*Goal: Move animations off the main thread and reduce layout thrashing.*

1.  **Refactor `CursorStardust`:**
    *   **Problem:** DOM node creation/deletion on `mousemove` triggers constant Layout/Paint.
    *   **Solution:** Rewrite using the **HTML5 Canvas API** or a single WebGL instance. Alternatively, use CSS Custom Properties (Variables) on a single `div` to track mouse position and simple CSS gradients, removing the JS DOM manipulation entirely.
2.  **Optimize `GlitchText`:**
    *   Refactor the `setInterval` to pause via a ref when the component is not in the viewport (using Intersection Observer).
    *   Reduce frequency from constant to hover-only or initial-load-only to save CPU cycles.
3.  **CSS-First Approach:**
    *   Convert `Projects` component hover effects (scale/transform) from JS/Framer to hardware-accelerated CSS (`transform: scale()`, `transition: transform 0.3s ease`).
4.  **`Skills` Component SVG:**
    *   Move position calculations out of the render loop. Calculate positions once inside `useMemo`.
    *   If nodes are static, render them as a static SVG string or CSS grid rather than individual React nodes.

### Phase 3: Rendering Efficiency & React Logic
*Goal: Prevent unnecessary re-renders and calculation overhead.*

1.  **Implement Memoization:**
    *   Wrap children of complex layouts in `React.memo()`, specifically `GlitchText`, `DecorativeGrid`, and individual Project cards.
    *   Wrap all event handlers (mouse moves, clicks) in `useCallback`.
    *   Wrap expensive derivations (sorting projects, filtering skills) in `useMemo`.
2.  **Virtualization:**
    *   Implement `react-window` or `react-virtuoso` for the `Experience` timeline to only render cards currently in the viewport.
3.  **Intersection Observer Strategy:**
    *   Create a reusable `useInView` hook (or use `framer-motion`'s `whileInView` sparingly).
    *   **Rule:** Components below the fold (Experience, Projects, Contact) must not hydrate or start animation logic until they are within 200px of the viewport.

### Phase 4: Loading Performance & Build Optimization
*Goal: Improve FCP and LCP scores.*

1.  **Code Splitting:**
    *   Implement `next/dynamic` imports for heavy, below-the-fold components (`Experience`, `Projects`, `Skills`).
    *   Example: `const Experience = dynamic(() => import('./Experience'), { loading: () => <Skeleton /> })`.
2.  **Font Optimization:**
    *   Migrate to `next/font/google` (or local hosting via `next/font/local`) to ensure zero layout shift and eliminate network requests to Google Fonts.
3.  **Resource Hints:**
    *   Add `<link rel="preconnect">` for any external API origins in the root layout.
    *   Ensure critical CSS is being extracted (Next.js default, but verify `optimizeCss` is true in config).
4.  **Strict Image Handling:**
    *   Although audit says "no images," ensure any future assets use `next/image` with `placeholder="blur"` and explicit dimensions to prevent CLS.

### Phase 5: Accessibility & Scalability
*Goal: Ensure inclusivity and future-proofing.*

1.  **Reduced Motion Support:**
    *   Add a `prefers-reduced-motion` media query check.
    *   Programmatically disable `GlitchText`, `CursorStardust`, and parallax effects if the user has requested reduced motion.
2.  **Animation Priority:**
    *   Ensure Hero animations load immediately. Delay `DecorativeGrid` animation until after the LCP event has fired.

### Phase 6: Monitoring & Maintenance
*Goal: Prevent regression.*

1.  **Performance Budget:**
    *   Configure `.bundlesize` or similar CI tool to fail builds if the main bundle exceeds 100KB (gzipped).
2.  **Web Vitals Tracking:**
    *   Install `@vercel/speed-insights` or implement a custom `reportWebVitals` function in `_app.js` / `layout.js` to log real-user metrics.
3.  **Linting Rules:**
    *   Add `eslint-plugin-react-perf` to catch un-memoized objects/functions in props automatically.