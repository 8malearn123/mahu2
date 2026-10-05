import type { Locale } from "@/i18n/config";
import { jobs } from "@/i18n/dictionaries/jobs";
import { RolesAccordion } from "./RolesAccordion";
import styles from "./RolesSection.module.css";

export function RolesSection({ lang }: { lang: Locale }) {
  const t = jobs[lang].roles;
  return (
    <section id="roles" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 className={styles.title}>{t.rolesTitle}</h2>
          </div>
        </div>
        <RolesAccordion t={t} />
      </div>
    </section>
  );
}
