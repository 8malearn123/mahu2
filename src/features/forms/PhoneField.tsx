import { Input } from "@/components/ds";
import { toMobileDigits } from "./validation";
import styles from "./forms.module.css";

type PhoneFieldProps = {
  label: string;
  /** Digits only, at most nine. */
  value: string;
  error?: string;
  onChange: (digits: string) => void;
};

/** Saudi mobile number: a fixed "+966" box beside an input that keeps digits only. */
export function PhoneField({ label, value, error, onChange }: PhoneFieldProps) {
  return (
    <div className={styles.phoneRow}>
      <div className={styles.countryCode} dir="ltr">
        +966
      </div>
      <Input
        className={styles.phoneInput}
        label={label}
        placeholder="5X XXX XXXX"
        inputMode="numeric"
        value={value}
        error={error}
        onChange={(event) => onChange(toMobileDigits(event.target.value))}
      />
    </div>
  );
}
