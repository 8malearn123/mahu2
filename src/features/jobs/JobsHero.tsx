import Image from "next/image";
import carrier from "@/assets/brand/carrier-pour.webp";
import { Button, Landscape } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { jobs } from "@/i18n/dictionaries/jobs";
import styles from "./JobsHero.module.css";

/**
 * The rebrand's cover for hiring: the sunset gradient with ink copy, the mountains-to-sea line art
 * along the bottom, and a product shot from the new identity (the carrier being poured) as the card.
 */
export function JobsHero({ lang }: { lang: Locale }) {
  const t = jobs[lang].hero;
  return (
    <section className={styles.hero}>
      <div className={styles.stage}>
        <Landscape className={styles.art} />
        <div className={styles.inner}>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              {t.heroTitleA}
              <br />
              {t.heroTitleB}
            </h1>
            <p className={styles.body}>{t.heroBody}</p>
            <div className={styles.actions}>
              <Button href="#apply" variant="primary" size="lg">
                <span className={styles.applyLabel}>
                  {t.applyNow}
                  <ArrowIcon />
                </span>
              </Button>
              <Button href="#roles" variant="secondary" size="lg" className={styles.rolesButton}>
                {t.seeRoles}
              </Button>
            </div>
          </div>
          <div className={styles.media}>
            <figure className={styles.card}>
              <Image
                src={carrier}
                alt={t.cardAlt}
                sizes="(max-width: 480px) calc(100vw - 48px), 440px"
                preload
                className={styles.image}
              />
              <figcaption className={styles.caption}>
                <span className={styles.captionLine}>{t.cardLine}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
