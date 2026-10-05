"use client";

import { useSyncExternalStore } from "react";

// Asia/Riyadh is UTC+3 all year (no daylight saving).
function riyadhHour(): number {
  return (new Date().getUTCHours() + 3) % 24;
}

function subscribe(onChange: () => void): () => void {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/**
 * The current hour (0–23) in Jazan, so opening hours read the same wherever the visitor is.
 * Returns `null` while prerendering and hydrating; the real hour arrives right after.
 */
export function useRiyadhHour(): number | null {
  return useSyncExternalStore(subscribe, riyadhHour, () => null);
}
