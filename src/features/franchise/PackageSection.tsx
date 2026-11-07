import type { Locale } from "@/i18n/config";
import { franchise } from "@/i18n/dictionaries/franchise";
import { cx } from "@/lib/cx";
import styles from "./PackageSection.module.css";

// Each band's colour, top to bottom: a walk through the palette from paper to ink.
const BANDS = [styles.paper, styles.peach, styles.orange, styles.coral, styles.dusk, styles.ink] as const;

/** "What you get": the franchise package as a stack of coloured bands, one per step. */
export function PackageSection({ lang }: { lang: Locale }) {
  const t = franchise[lang].pack;
  return (
    <section id="package" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>{t.packTitle}</h2>
        </div>
        <ol className={styles.bands}>
          {t.items.map((item, index) => (
            <li key={item.title} className={cx(styles.band, BANDS[index % BANDS.length])}>
              <span aria-hidden="true" className={styles.bandNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.bandTitle}>{item.title}</h3>
              <p className={styles.bandBody}>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
