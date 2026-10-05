import { Button } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import { localePath, type Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { PointsCard } from "./PointsCard";
import styles from "./Loyalty.module.css";

export function Loyalty({ lang }: { lang: Locale }) {
  const t = landing[lang].loyalty;
  return (
    <section id="card" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>
            {t.titleA}
            <br />
            {t.titleB}
          </h2>
          <p className={styles.body}>{t.body}</p>
          <Button variant="primary" size="lg" href={localePath(lang, "/order")}>
            {t.cta}
            <ArrowIcon />
          </Button>
        </div>

        <div className={styles.cardSlot}>
          <PointsCard t={t.card} />
        </div>
      </div>
    </section>
  );
}
