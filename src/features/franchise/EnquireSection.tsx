import type { Locale } from "@/i18n/config";
import { franchise } from "@/i18n/dictionaries/franchise";
import { FRANCHISE_EMAIL } from "./enquiry";
import { EnquiryForm } from "./EnquiryForm";
import styles from "./EnquireSection.module.css";

export function EnquireSection({ lang }: { lang: Locale }) {
  const t = franchise[lang];
  return (
    <section id="enquire" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{t.enquire.formTitle}</h2>
          <p className={styles.body}>{t.enquire.formBody}</p>
          <div className={styles.deck}>
            <span className={styles.deckTitle}>{t.enquire.deckTitle}</span>
            <p className={styles.deckBody}>{t.enquire.deckBody}</p>
            <a href={`mailto:${FRANCHISE_EMAIL}`} className={styles.deckLink}>
              {t.enquire.deckLink}
              <span dir="ltr">{FRANCHISE_EMAIL}</span>
            </a>
          </div>
        </div>
        <div className={styles.formColumn}>
          <EnquiryForm t={t.form} />
        </div>
      </div>
    </section>
  );
}
