import Image from "next/image";
import carrier from "@/assets/brand/carrier-pour.webp";
import cup from "@/assets/brand/cup-gradient.webp";
import stickers from "@/assets/brand/stickers.webp";
import type { Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { cx } from "@/lib/cx";
import styles from "./Story.module.css";

// Rendered widths: two columns from ~700px, where the gallery is one of them (518px in the
// 1100px container, ~43.5vw below it); one full-width column under that. The lower row splits
// the gallery 3 : 5 between the portrait stickers tile and the carrier tile; the stickers image
// is drawn at 1.3× inside its tile (see .imageStickers), hence its larger sizes.
const WIDE_SIZES = "(min-width: 1200px) 518px, (min-width: 700px) 44vw, 100vw";
const NARROW_SIZES = "(min-width: 1200px) 246px, (min-width: 700px) 21vw, 50vw";
const MID_SIZES = "(min-width: 1200px) 315px, (min-width: 700px) 27vw, 62vw";

/** "من جازان": where the identity comes from, set on ink beside the packaging mockups. The hero's "Learn more" lands here. */
export function Story({ lang }: { lang: Locale }) {
  const t = landing[lang].story;
  return (
    <section id="story" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <span aria-hidden="true" className={styles.rule} />
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.body}>{t.body}</p>
        </div>
        <div className={styles.gallery}>
          <div className={cx(styles.tile, styles.tileWide)}>
            <Image src={cup} alt={t.alt.cup} sizes={WIDE_SIZES} className={cx(styles.image, styles.imageCup)} />
          </div>
          <div className={styles.tile}>
            {/* Fills whatever height the carrier tile gives the row, so it stays out of the row's sizing. */}
            <Image src={stickers} alt={t.alt.stickers} fill sizes={NARROW_SIZES} className={styles.imageStickers} />
          </div>
          <div className={styles.tile}>
            <Image src={carrier} alt={t.alt.carrier} sizes={MID_SIZES} className={cx(styles.image, styles.imageCarrier)} />
          </div>
        </div>
      </div>
    </section>
  );
}
