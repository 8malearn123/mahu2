import Image from "next/image";
import heroImage from "@/assets/brand/hero-coast.jpg";
import { Button, Landscape, Logo } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import styles from "./Hero.module.css";

/**
 * The rebrand's cover, split in two: the sunset gradient with the logo, the title and the
 * mountains-to-sea line art on the copy side, and the identity's website photograph on the other.
 */
export function Hero({ lang }: { lang: Locale }) {
  const t = landing[lang].hero;
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.copyPanel}>
        <Landscape className={styles.art} />
        <div className={styles.copy}>
          <Logo variant="stacked" color="ink" className={styles.logo} />
          <h1 className={styles.title}>
            {t.titleA}
            <br />
            {t.titleB}
          </h1>
          <Button variant="primary" size="lg" href="#story" className={styles.more}>
            <span className={styles.moreLabel}>
              {t.learnMore}
              <ArrowIcon />
            </span>
          </Button>
        </div>
      </div>
      <div className={styles.photo}>
        <Image src={heroImage} alt={t.imageAlt} fill sizes="(min-width: 900px) 50vw, 100vw" preload className={styles.image} />
      </div>
    </section>
  );
}
