import {
  hasErrors,
  isFullName,
  isSaudiMobile,
  referenceCode,
  type FieldErrors,
  type SubmitResult,
} from "@/features/forms/validation";

/** The job application, language-neutral: choices are indices into the translated lists. */
export type ApplicationValues = {
  name: string;
  /** Mobile number without +966: digits only, at most nine. */
  phone: string;
  /** Index into the roles; `null` until one is picked. */
  role: number | null;
  /** Index into the availability options. */
  shift: number;
  /** Index into the experience options (optional). */
  exp: number | null;
  about: string;
  consent: boolean;
};

export type ApplicationField = "name" | "phone" | "role" | "consent";

export const EMPTY_APPLICATION: ApplicationValues = {
  name: "",
  phone: "",
  role: null,
  // The first option, "Morning". (The design stored the Arabic label, so English showed none picked.)
  shift: 0,
  exp: null,
  about: "",
  consent: false,
};

export function validateApplication(values: ApplicationValues): FieldErrors<ApplicationField> {
  const errors: FieldErrors<ApplicationField> = {};
  if (!isFullName(values.name)) errors.name = true;
  if (!isSaudiMobile(values.phone)) errors.phone = true;
  if (values.role === null) errors.role = true;
  if (!values.consent) errors.consent = true;
  return errors;
}

/**
 * Sends a job application. The design has no backend, so nothing leaves the browser yet: a valid
 * application just gets a demo reference (`MJ-###`). Post `values` to the hiring backend here.
 */
export function submitApplication(values: ApplicationValues): SubmitResult<ApplicationField> {
  const errors = validateApplication(values);
  if (hasErrors(errors)) return { ok: false, errors };
  return { ok: true, reference: referenceCode("MJ") };
}
