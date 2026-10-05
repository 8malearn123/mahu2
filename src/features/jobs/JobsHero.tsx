import Image from "next/image";
import apron from "@/assets/brand/mockup-apron.png";
import { Button, SceneBand } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { jobs } from "@/i18n/dictionaries/jobs";
import styles from "./JobsHero.module.css";

export function JobsHero({ lang }: { lang: Locale }) {
  const t = jobs[lang].hero;
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
            <Button href="#apply" variant="onBrand" size="lg">
              <span className={styles.applyLabel}>
                {t.applyNow}
                <ArrowIcon />
              </span>
            </Button>
            <Button href="#roles" variant="ghost" size="md" className={styles.rolesButton}>
              <span className={styles.rolesLabel}>{t.seeRoles}</span>
            </Button>
          </div>
        </div>
        <div className={styles.media}>
          <div className={styles.card}>
            <Image
              src={apron}
              alt={t.apronAlt}
              sizes="(max-width: 480px) calc(100vw - 48px), 420px"
              preload
              className={styles.image}
            />
            <div className={styles.caption}>
              <span className={styles.captionLine}>{t.apronLine}</span>
            </div>
          </div>
        </div>
      </div>
      <SceneBand scene="beach" height={16} />
    </section>
  );
}
