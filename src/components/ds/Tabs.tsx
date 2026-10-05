import { cx } from "@/lib/cx";
import styles from "./Tabs.module.css";

type TabsProps<V extends string> = {
  items: readonly { value: V; label: string }[];
  value: V;
  onChange?: (value: V) => void;
  variant?: "underline" | "pill";
  className?: string;
};

export function Tabs<V extends string>({ items, value, onChange, variant = "underline", className }: TabsProps<V>) {
  return (
    <div role="tablist" className={cx(styles.tabs, styles[variant], className)}>
      {items.map((it) => {
        const on = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={on}
            className={cx(styles.tab, on && styles.on)}
            onClick={() => onChange?.(it.value)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
