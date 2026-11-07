import Image from "next/image";
import heroImage from "@/assets/brand/hero-coast.jpg";
import { Button, Eyebrow, Landscape } from "@/components/ds";
import { ArrowIcon, PinIcon } from "@/components/icons";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { landing } from "@/i18n/dictionaries/landing";
import styles from "./Hero.module.css";

/**
 * The rebrand's cover, split in two: the sunset gradient with the mountains-to-sea line art on the
 * copy side, and the identity's website photograph, uncropped where there's room, on the other.
 */
export function Hero({ lang }: { lang: Locale }) {
  const t = landing[lang].hero;
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.copyPanel}>
        <Landscape className={styles.art} />
        <div className={styles.copy}>
          <Eyebrow tone="ink">{t.eyebrow}</Eyebrow>
          <h1 className={styles.title}>
            {t.titleA}
            <br />
            {t.titleB}
          </h1>
          <p className={styles.body}>{t.body}</p>
          <div className={styles.actions}>
            <Button variant="primary" size="lg" href={localePath(lang, "/order")}>
              <span className={styles.orderLabel}>
                {common[lang].order}
                <ArrowIcon />
              </span>
            </Button>
            <Button variant="secondary" size="lg" href="#find" className={styles.findButton}>
              <PinIcon size={18} />
              {t.findWindow}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.photo}>
        <Image src={heroImage} alt={t.imageAlt} fill sizes="(min-width: 900px) 50vw, 100vw" preload className={styles.image} />
      </div>
    </section>
  );
}
