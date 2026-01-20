"use client";

export function DecorativeGrid() {
  return (
    <div
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, #333 1px, transparent 1px),
          linear-gradient(to bottom, #333 1px, transparent 1px)
        `,
        backgroundSize: '4rem 4rem',
        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
      }}
    />
  );
}
