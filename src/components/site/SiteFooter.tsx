import Link from "next/link";
import { Logo, SceneBand } from "@/components/ds";
import type { Locale } from "@/i18n/config";
import { common, PHONE_DISPLAY } from "@/i18n/dictionaries/common";
import { SmartLink } from "./SmartLink";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  lang: Locale;
  /** On the landing page, links to its sections stay in-page. */
  onLanding?: boolean;
};

export function SiteFooter({ lang, onLanding = false }: SiteFooterProps) {
  const t = common[lang].footer;
  const home = `/${lang}`;
  const section = (id: string) => (onLanding ? `#${id}` : `${home}#${id}`);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <SmartLink href={onLanding ? "#top" : home} aria-label="Mahu" className={styles.logoLink}>
            <Logo color="cream" height={32} />
          </SmartLink>
          <p className={styles.tagline}>{t.tagline}</p>
        </div>
        <div className={styles.column}>
          <span className={styles.eyebrow}>{t.menuEyebrow}</span>
          <SmartLink href={section("menu")} className={styles.link}>{t.espresso}</SmartLink>
          <SmartLink href={section("menu")} className={styles.link}>{t.filter}</SmartLink>
          <SmartLink href={section("menu")} className={styles.link}>{t.cold}</SmartLink>
        </div>
        <div className={styles.column}>
          <span className={styles.eyebrow}>{t.visit}</span>
          <SmartLink href={section("find")} className={styles.link}>{t.address}</SmartLink>
          <span className={styles.text}>{t.hours}</span>
          <span className={styles.phone}>{PHONE_DISPLAY}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.eyebrow}>{t.follow}</span>
          <a href="#" className={styles.link}>{t.instagram}</a>
          <Link href={`${home}/jobs`} className={styles.link}>{t.careers}</Link>
          <Link href={`${home}/franchise`} className={styles.link}>{t.franchise}</Link>
        </div>
      </div>
      <SceneBand scene="beach" height={16} />
    </footer>
  );
}
