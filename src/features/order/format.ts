// Input masks, as typed.

/** Digits and spaces, up to "5X XXX XXXX". */
export function formatPhone(value: string): string {
  return value.replace(/[^\d ]/g, "").slice(0, 11);
}

/** "4242 4242 4242 4242" */
export function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

/** "MM/YY" */
export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

export function formatCvv(value: string): string {
  return value.replace(/\D/g, "").slice(0, 3);
}
