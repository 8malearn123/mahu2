import Image from "next/image";
import box from "@/assets/brand/box.webp";
import { Button, Eyebrow, Landscape } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { franchise } from "@/i18n/dictionaries/franchise";
import styles from "./FranchiseHero.module.css";

/**
 * The rebrand's cover: the sunset gradient, ink copy and the mountains-to-sea line art along the
 * bottom edge, with the brand's mailer boxes ("a brand ready to run") on a paper card. Like the
 * landing hero, it ends on the art itself: no bar under it.
 */
export function FranchiseHero({ lang }: { lang: Locale }) {
  const t = franchise[lang].hero;
  return (
    <section className={styles.hero}>
      <Landscape className={styles.art} />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Eyebrow tone="ink">{common[lang].footer.franchise}</Eyebrow>
          <h1 className={styles.title}>
            {t.heroTitleA}
            <br />
            {t.heroTitleB}
          </h1>
          <p className={styles.body}>{t.heroBody}</p>
          <div className={styles.actions}>
            <Button href="#enquire" variant="primary" size="lg">
              <span className={styles.registerLabel}>
                {t.register}
                <ArrowIcon />
              </span>
            </Button>
          </div>
        </div>
        <div className={styles.media}>
          <figure className={styles.card}>
            <Image
              src={box}
              alt={t.boxAlt}
              sizes="(max-width: 520px) calc(100vw - 48px), 460px"
              preload
              className={styles.image}
            />
            <figcaption className={styles.caption}>
              <span className={styles.captionLine}>{t.boxLine}</span>
              <span className={styles.captionSub}>{t.boxSub}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
