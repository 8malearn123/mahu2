import Link from "next/link";
import { Badge, Button, SlotImage } from "@/components/ds";
import { ArrowIcon } from "@/components/icons";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { landing } from "@/i18n/dictionaries/landing";
import { FEATURED, LIMITED_DROP } from "./data";
import styles from "./MenuSection.module.css";

type MenuSectionProps = {
  lang: Locale;
  showLimited: boolean;
};

export function MenuSection({ lang, showLimited }: MenuSectionProps) {
  const t = landing[lang].menu;
  const orderPath = localePath(lang, "/order");
  return (
    <section id="menu" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 className={styles.title}>
              {t.titleA}
              <br />
              {t.titleB}
            </h2>
          </div>
          <div className={styles.headAction}>
            <Button variant="secondary" size="lg" href={orderPath}>
              {t.viewAll}
              <ArrowIcon />
            </Button>
          </div>
        </div>

        <div className={styles.cards}>
          {FEATURED.map((item) => {
            const copy = t.featured[item.id];
            return (
              <div key={item.id} className={styles.card}>
                <div className={styles.photo}>
                  <SlotImage id={item.slot} alt={copy.name} />
                  <div className={styles.badge}>
                    <Badge tone={item.badgeTone}>{copy.badge}</Badge>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.name}>{copy.name}</h3>
                  <p className={styles.note}>{copy.note}</p>
                  <span className={styles.proof}>{copy.proof}</span>
                  <div className={styles.buy}>
                    <span className={styles.price}>
                      {item.price}
                      <span className={styles.currency}>{common[lang].currency}</span>
                    </span>
                    <Button variant="primary" size="sm" href={`${orderPath}?add=${item.id}`}>
                      {t.add}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showLimited && (
          <div className={styles.drop}>
            <div className={styles.dropPhoto}>
              <SlotImage id={LIMITED_DROP.slot} alt={t.featured[LIMITED_DROP.id].name} />
            </div>
            <div className={styles.dropContent}>
              <div className={styles.dropText}>
                <span className={styles.dropTitle}>{t.dropTitle}</span>
                <span className={styles.dropBody}>{t.dropBody}</span>
              </div>
              <Link href={`${orderPath}?add=${LIMITED_DROP.id}`} className={styles.dropButton}>
                {t.add}
                <ArrowIcon size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
