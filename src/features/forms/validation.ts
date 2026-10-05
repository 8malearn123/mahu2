// Field rules shared by the job application and the franchise enquiry (as in the design).

/** Per-field error flags. The messages are looked up at render time, so they follow the language. */
export type FieldErrors<Field extends string> = Partial<Record<Field, true>>;

/** What a form's submit function returns: a reference for the confirmation, or what to fix. */
export type SubmitResult<Field extends string> =
  | { ok: true; reference: string }
  | { ok: false; errors: FieldErrors<Field> };

/** A full name: at least three characters once trimmed. */
export function isFullName(name: string): boolean {
  return name.trim().length >= 3;
}

/** What the mobile field keeps of typed or pasted text: digits only, at most nine (+966 is shown apart). */
export function toMobileDigits(value: string): string {
  return value.replace(/[^\d]/g, "").slice(0, 9);
}

/** A Saudi mobile number without the country code: 5 followed by eight digits. */
export function isSaudiMobile(phone: string): boolean {
  return /^5\d{8}$/.test(phone.replace(/\D/g, ""));
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}

/** Editing fields clears their errors and leaves the others, as the design does. */
export function clearErrors<Field extends string>(errors: FieldErrors<Field>, edited: object): FieldErrors<Field> {
  const next = { ...errors };
  for (const key of Object.keys(edited)) delete next[key as Field];
  return next;
}

/** A demo reference such as `MJ-482`. It is random, so call it from event handlers only. */
export function referenceCode(prefix: string): string {
  return `${prefix}-${Math.floor(Math.random() * 900 + 100)}`;
}
