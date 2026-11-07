"use client";

import { useId, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ChevronIcon, OutIcon } from "./icons";
import pill from "./pill.module.css";
import styles from "./Choice.module.css";

type ChoiceProps = {
  icon: ReactNode;
  label: string;
  /** Outside links, each opened in a new tab. */
  options: { label: string; href: string }[];
};

/** A button in the list that opens into a few outside links (one per window). */
export function Choice({ icon, label, options }: ChoiceProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cx(pill.pill, pill.plain)}
      >
        {icon}
        <span className={pill.label}>{label}</span>
        <ChevronIcon className={cx(styles.chevron, open && styles.chevronOpen)} />
      </button>
      <div id={id} inert={!open} className={cx(styles.panel, open && styles.panelOpen)}>
        <ul className={styles.list}>
          {options.map((option, i) => (
            <li key={option.href} className={i === 0 ? styles.first : undefined}>
              <a href={option.href} target="_blank" rel="noopener" className={pill.sub}>
                {option.label}
                <OutIcon className={pill.out} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
