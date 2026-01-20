"use client";

import dynamic from "next/dynamic";

const CursorStardust = dynamic(
  () => import("@/components/effects/CursorStardust").then((mod) => mod.CursorStardust),
  { ssr: false, loading: () => null }
);

export default function DecorationsClient() {
  return <CursorStardust />;
}
