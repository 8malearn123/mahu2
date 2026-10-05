import type { Locale } from "@/i18n/config";
import { franchise } from "@/i18n/dictionaries/franchise";
import { cx } from "@/lib/cx";
import styles from "./ProofSection.module.css";

// The scene drawn above each stat, in order.
const MOTIFS = ["sun", "wave", "board", "cup"] as const;

type Motif = (typeof MOTIFS)[number];

function Scene({ motif }: { motif: Motif }) {
  switch (motif) {
    case "sun":
      return (
        <>
          <span className={styles.sunDisc} />
          <span className={styles.sunSea} />
          <span className={cx(styles.sunGlint, styles.sunGlint1)} />
          <span className={cx(styles.sunGlint, styles.sunGlint2)} />
          <span className={cx(styles.sunGlint, styles.sunGlint3)} />
          <span className={cx(styles.sunGlint, styles.sunGlint4)} />
          <span className={cx(styles.sunGlint, styles.sunGlint5)} />
        </>
      );
    case "wave":
      return (
        <>
          <span className={styles.waveSun} />
          <span className={styles.waveHillLeft} />
          <span className={styles.waveHillRight} />
          <span className={styles.waveCrest} />
          <span className={styles.waveGround} />
          <span className={cx(styles.waveDash, styles.waveDash1)} />
          <span className={cx(styles.waveDash, styles.waveDash2)} />
          <span className={cx(styles.waveDash, styles.waveDash3)} />
          <span className={cx(styles.waveDash, styles.waveDash4)} />
          <span className={cx(styles.waveDash, styles.waveDash5)} />
        </>
      );
    case "board":
      return (
        <>
          <span className={styles.boardSea} />
          <span className={styles.boardSand} />
          <span className={styles.boardLeft} />
          <span className={styles.boardMiddle} />
          <span className={styles.boardRight} />
          <span className={styles.boardStripe} />
        </>
      );
    case "cup":
      return (
        <>
          <span className={styles.cupSand} />
          <span className={styles.cupSun} />
          <span className={styles.cupHillLeft} />
          <span className={styles.cupHillRight} />
          <span className={styles.cupSea} />
        </>
      );
  }
}

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
              <div className={styles.scene} aria-hidden="true">
                <Scene motif={MOTIFS[index % MOTIFS.length]} />
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
