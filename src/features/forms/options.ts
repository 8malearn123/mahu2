import type { SelectOption } from "@/components/ds";

// Choices are stored as indices into the translated lists, so a selection survives a language switch.

/** Options for a translated list, valued by index; `placeholder` adds the empty "Pick one" option first. */
export function indexOptions(labels: readonly string[], placeholder?: string): SelectOption[] {
  const options = labels.map((label, index) => ({ value: String(index), label }));
  return placeholder === undefined ? options : [{ value: "", label: placeholder }, ...options];
}

/** The option value for a stored index (`null`: nothing picked yet). */
export function optionValue(index: number | null): string {
  return index === null ? "" : String(index);
}

/** The stored index for an option value. */
export function optionIndex(value: string): number | null {
  return value === "" ? null : Number(value);
}
