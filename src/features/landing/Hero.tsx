import Image from "next/image";
import heroImage from "@/assets/brand/hero-mahu-cups.png";
import { Button } from "@/components/ds";
import { ArrowDownIcon, ArrowIcon, PinIcon } from "@/components/icons";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { landing } from "@/i18n/dictionaries/landing";
import styles from "./Hero.module.css";

export function Hero({ lang }: { lang: Locale }) {
  const t = landing[lang].hero;
  return (
    <section id="top" className={styles.hero}>
      <Image src={heroImage} alt={t.imageAlt} fill sizes="100vw" preload className={styles.image} />
      <div aria-hidden="true" className={styles.scrim} />
      <div aria-hidden="true" className={styles.fade} />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            {t.titleA}
            <br />
            {t.titleB}
          </h1>
          <p className={styles.body}>{t.body}</p>
          <div className={styles.actions}>
            <Button variant="onBrand" size="lg" href={localePath(lang, "/order")}>
              <span className={styles.orderLabel}>
                {common[lang].order}
                <ArrowIcon />
              </span>
            </Button>
            <a href="#find" className={styles.findButton}>
              <PinIcon size={18} />
              {t.findWindow}
            </a>
          </div>
        </div>
      </div>
      <a href="#menu" className={styles.scrollCue}>
        {t.scrollCue}
        <ArrowDownIcon />
      </a>
    </section>
  );
}
