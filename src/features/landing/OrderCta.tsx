import { Button, Landscape } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { landing } from "@/i18n/dictionaries/landing";
import styles from "./OrderCta.module.css";

/**
 * The closing call to action, set as the rebrand's cover: the sunset gradient, ink copy, and the
 * cream mountains-to-sea line art along the bottom edge.
 */
export function OrderCta({ lang }: { lang: Locale }) {
  const t = landing[lang].cta;
  return (
    <section id="order" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.sub}>{t.sub}</p>
        <Button variant="primary" size="lg" href={localePath(lang, "/order")}>
          {common[lang].order}
          <ArrowIcon />
        </Button>
      </div>
      <Landscape className={styles.art} />
    </section>
  );
}
