import type { Locale } from "@/i18n/config";
import { PHONE_DISPLAY } from "@/i18n/dictionaries/common";
import { jobs } from "@/i18n/dictionaries/jobs";
import { ApplicationForm } from "./ApplicationForm";
import styles from "./ApplySection.module.css";

const WHATSAPP_URL = "https://wa.me/966170000000";

export function ApplySection({ lang }: { lang: Locale }) {
  const t = jobs[lang];
  return (
    <section id="apply" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{t.apply.applyTitle}</h2>
          <p className={styles.body}>{t.apply.applyBody}</p>
          <div className={styles.walkIn}>
            <span className={styles.walkTitle}>{t.apply.walkTitle}</span>
            <p className={styles.walkBody}>{t.apply.walkBody}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener" className={styles.walkLink}>
              {t.apply.walkLink}
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
        <div className={styles.formColumn}>
          <ApplicationForm t={t.form} roles={t.roles.list.map((role) => role.title)} />
        </div>
      </div>
    </section>
  );
}
