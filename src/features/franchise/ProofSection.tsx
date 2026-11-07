import type { CSSProperties } from "react";
import { Landscape } from "@/components/ds";
import type { Locale } from "@/i18n/config";
import { franchise } from "@/i18n/dictionaries/franchise";
import { cx } from "@/lib/cx";
import styles from "./ProofSection.module.css";

// The colour of the tile above each stat, in order. The horizon (the sticker) is the page's one.
const TILES = [styles.orange, styles.coral, styles.ink, styles.horizon] as const;

/**
 * "A small window, a big number": four stats, each under a coloured tile. The tiles are windows
 * onto one stretch of the cover's line art, so the panorama runs on from tile to tile.
 */
export function ProofSection({ lang }: { lang: Locale }) {
  const t = franchise[lang].proof;
  return (
    <section id="proof" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>{t.proofTitle}</h2>
        </div>
        <div className={styles.grid}>
          {t.stats.map((stat, index) => (
            <div key={stat.value} className={styles.card}>
              <div
                className={cx(styles.tile, TILES[index % TILES.length])}
                style={{ "--i": index % TILES.length } as CSSProperties}
                aria-hidden="true"
              >
                <Landscape className={styles.tileArt} />
              </div>
              <div className={styles.text}>
                <div className={styles.figure}>
                  <span className={styles.value} dir={stat.dir}>
                    {stat.value}
                  </span>
                  <span className={styles.unit}>{stat.unit}</span>
                </div>
                <span className={styles.label}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
