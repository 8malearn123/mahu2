import { useId } from "react";
import { Input } from "@/components/ds";
import field from "@/components/ds/Field.module.css";
import { toMobileDigits } from "./validation";
import styles from "./forms.module.css";

type PhoneFieldProps = {
  label: string;
  /** Digits only, at most nine. */
  value: string;
  error?: string;
  onChange: (digits: string) => void;
};

/**
 * Saudi mobile number: a fixed "+966" box beside an input that keeps digits only. The label sits
 * above both, so the box lines up with the input even when an error shows under it.
 */
export function PhoneField({ label, value, error, onChange }: PhoneFieldProps) {
  const id = useId();
  return (
    <div className={styles.phoneField}>
      <label htmlFor={id} className={field.label}>
        {label}
      </label>
      <div className={styles.phoneRow}>
        <div className={styles.countryCode} dir="ltr">
          +966
        </div>
        <Input
          id={id}
          className={styles.phoneInput}
          placeholder="5X XXX XXXX"
          inputMode="numeric"
          value={value}
          error={error}
          onChange={(event) => onChange(toMobileDigits(event.target.value))}
        />
      </div>
    </div>
  );
}
