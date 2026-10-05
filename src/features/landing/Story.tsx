import Image from "next/image";
import bag from "@/assets/brand/mockup-bag.png";
import box from "@/assets/brand/mockup-box.png";
import stamp from "@/assets/brand/mockup-stamp.png";
import { Button } from "@/components/ds";
import type { Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { cx } from "@/lib/cx";
import styles from "./Story.module.css";

// Rendered widths: two columns from ~700px (the gallery is one of them, at most 518px wide in
// the 1100px container), one column below that.
const WIDE_SIZES = "(min-width: 1200px) 518px, (min-width: 700px) 44vw, 100vw";
const HALF_SIZES = "(min-width: 1200px) 251px, (min-width: 700px) 21vw, 50vw";

export function Story({ lang }: { lang: Locale }) {
  const t = landing[lang].story;
  return (
    <section id="story" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.body}>{t.body1}</p>
          <p className={styles.body}>{t.body2}</p>
          <Button variant="onBrand" size="md" href="#find">
            {t.visit}
          </Button>
        </div>
        <div className={styles.gallery}>
          <div className={cx(styles.tile, styles.tileWide)}>
            <Image src={bag} alt={t.alt.bag} sizes={WIDE_SIZES} className={cx(styles.image, styles.imageWide)} />
          </div>
          <div className={styles.tile}>
            <Image src={stamp} alt={t.alt.stamp} sizes={HALF_SIZES} className={styles.image} />
          </div>
          <div className={styles.tile}>
            <Image src={box} alt={t.alt.box} sizes={HALF_SIZES} className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
}
