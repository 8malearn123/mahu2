// In-progress state that should survive a client-side navigation but not a reload.
//
// Switching language swaps the [lang] route segment, which remounts the whole page tree, so
// stateful pages (the order flow, the job and franchise forms) park their state here and pick it
// up again on the other side. Values must be language-neutral (ids and indices, never translated
// strings) and must never include card details.
const drafts = new Map<string, unknown>();

export function readDraft<T>(key: string): T | undefined {
  return drafts.get(key) as T | undefined;
}

export function writeDraft<T>(key: string, value: T): void {
  // Only the browser keeps drafts; a shared server process must not.
  if (typeof window === "undefined") return;
  drafts.set(key, value);
}

export function clearDraft(key: string): void {
  drafts.delete(key);
}
