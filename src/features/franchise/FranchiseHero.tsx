import Image from "next/image";
import box from "@/assets/brand/mockup-box.png";
import { Button, SceneBand } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { franchise } from "@/i18n/dictionaries/franchise";
import styles from "./FranchiseHero.module.css";

export function FranchiseHero({ lang }: { lang: Locale }) {
  const t = franchise[lang].hero;
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            {t.heroTitleA}
            <br />
            {t.heroTitleB}
          </h1>
          <p className={styles.body}>{t.heroBody}</p>
          <div className={styles.actions}>
            <Button href="#enquire" variant="onBrand" size="lg">
              <span className={styles.registerLabel}>
                {t.register}
                <ArrowIcon />
              </span>
            </Button>
          </div>
        </div>
        <div className={styles.media}>
          <div className={styles.card}>
            <Image
              src={box}
              alt={t.boxAlt}
              sizes="(max-width: 480px) calc(100vw - 48px), 420px"
              preload
              className={styles.image}
            />
            <div className={styles.caption}>
              <span className={styles.captionLine}>{t.boxLine}</span>
              <span className={styles.captionSub}>{t.boxSub}</span>
            </div>
          </div>
        </div>
      </div>
      <SceneBand scene="beach" height={16} />
    </section>
  );
}
