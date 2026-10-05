"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { SceneBand } from "./SceneBand";
import styles from "./Dialog.module.css";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  /** Max panel width in px. */
  width?: number;
  /** Applied to the panel. */
  className?: string;
};

/**
 * Modal dialog from the Mahu design system, on a native <dialog>: Escape and a click on the
 * scrim close it, focus stays inside, and it sits above every fixed or sticky element.
 */
export function Dialog({ open, onClose, title, footer, children, width = 460, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Start focus on the panel itself rather than its first control (no focus ring on open).
      panelRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={title ? titleId : undefined}
      // Fires for Escape as well as for our own close(); only report closes we didn't ask for.
      onClose={() => open && onClose()}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {open && (
        <div ref={panelRef} tabIndex={-1} className={cx(styles.panel, className)} style={{ maxWidth: width }}>
          <SceneBand scene="sunset" height={8} />
          <div className={styles.body}>
            {title && (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            )}
            <div className={styles.content}>{children}</div>
            {footer && <div className={styles.footer}>{footer}</div>}
          </div>
        </div>
      )}
    </dialog>
  );
}
