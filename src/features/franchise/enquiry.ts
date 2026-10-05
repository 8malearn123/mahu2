import {
  hasErrors,
  isFullName,
  isSaudiMobile,
  referenceCode,
  type FieldErrors,
  type SubmitResult,
} from "@/features/forms/validation";

export const FRANCHISE_EMAIL = "franchise@mahu.cafe";

/** The franchise enquiry, language-neutral: choices are indices into the translated lists. */
export type EnquiryValues = {
  name: string;
  /** Mobile number without +966: digits only, at most nine. */
  phone: string;
  /** Index into the cities; `null` until one is picked. */
  city: number | null;
  /** Index into the capital ranges; `null` until one is picked. */
  capital: number | null;
  /** Index into the site options. */
  site: number;
  /** Index into the experience options (optional). */
  exp: number | null;
  about: string;
  consent: boolean;
};

export type EnquiryField = "name" | "phone" | "city" | "capital" | "consent";

export const EMPTY_ENQUIRY: EnquiryValues = {
  name: "",
  phone: "",
  city: null,
  capital: null,
  site: 0,
  exp: null,
  about: "",
  consent: false,
};

export function validateEnquiry(values: EnquiryValues): FieldErrors<EnquiryField> {
  const errors: FieldErrors<EnquiryField> = {};
  if (!isFullName(values.name)) errors.name = true;
  if (!isSaudiMobile(values.phone)) errors.phone = true;
  if (values.city === null) errors.city = true;
  if (values.capital === null) errors.capital = true;
  if (!values.consent) errors.consent = true;
  return errors;
}

/**
 * Sends a franchise enquiry. The design has no backend, so nothing leaves the browser yet: a valid
 * enquiry just gets a demo reference (`MF-###`). Post `values` to the franchise backend here.
 */
export function submitEnquiry(values: EnquiryValues): SubmitResult<EnquiryField> {
  const errors = validateEnquiry(values);
  if (hasErrors(errors)) return { ok: false, errors };
  return { ok: true, reference: referenceCode("MF") };
}
