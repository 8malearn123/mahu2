"use client";

import { useId } from "react";
import { Button } from "@/components/ds";
import { ArrowIcon, ChevronDownIcon } from "@/components/icons";
import type { JobsDictionary } from "@/i18n/dictionaries/jobs";
import { cx } from "@/lib/cx";
import { useJobsDraft } from "./JobsDraft";
import styles from "./RolesSection.module.css";

/** One role open at a time; "Apply for this role" picks it in the form and goes there. */
export function RolesAccordion({ t }: { t: JobsDictionary["roles"] }) {
  const { state, dispatch } = useJobsDraft();
  const baseId = useId();

  return (
    <div className={styles.list}>
      {t.list.map((role, index) => {
        const expanded = state.open === index;
        const bodyId = `${baseId}-role-${index}`;
        return (
          <div key={role.title} className={styles.role}>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={expanded}
              aria-controls={bodyId}
              onClick={() => dispatch({ type: "toggleRole", index })}
            >
              <span className={styles.summary}>
                <span className={styles.roleTitle}>{role.title}</span>
                <span className={styles.tags}>
                  {role.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              </span>
              <span className={styles.payBlock}>
                <span className={styles.pay} dir="ltr">
                  {role.pay}
                </span>
                <span className={styles.perMonth}>{t.perMonth}</span>
              </span>
              <span className={cx(styles.chevron, expanded && styles.chevronOpen)}>
                <ChevronDownIcon />
              </span>
            </button>
            <div id={bodyId} className={styles.body} hidden={!expanded}>
              <div className={styles.lists}>
                <div className={styles.column}>
                  <span className={styles.listLabel}>{t.doLabel}</span>
                  {role.doItems.map((item) => (
                    <span key={item} className={styles.item}>
                      <span className={styles.dash} aria-hidden="true">
                        —
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
                <div className={styles.column}>
                  <span className={styles.listLabel}>{t.needLabel}</span>
                  {role.needItems.map((item) => (
                    <span key={item} className={styles.item}>
                      <span className={styles.dash} aria-hidden="true">
                        —
                      </span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.applyRow}>
                <Button
                  href="#apply"
                  variant="primary"
                  size="md"
                  onClick={() => dispatch({ type: "chooseRole", index })}
                >
                  <span className={styles.applyLabel}>
                    {t.applyRole}
                    <ArrowIcon size={18} />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
