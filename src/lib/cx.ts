/** Join the class names that are non-empty strings; anything else (false, null, 0…) is skipped. */
export function cx(...parts: unknown[]): string {
  return parts.filter((part): part is string => typeof part === "string" && part.length > 0).join(" ");
}
