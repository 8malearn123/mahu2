import { Logo } from "@/components/ds";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { lobby } from "@/i18n/dictionaries/lobby";
import { cx } from "@/lib/cx";
import { Backdrop } from "./Backdrop";
import { ArrowIcon, ListIcon, SwellIcon } from "./icons";
import { Socials } from "./Socials";
import pill from "./pill.module.css";
import styles from "./SectionEnd.module.css";

/** Rendered at build time; the pages are static. */
const YEAR = new Date().getFullYear();

/** The end of a section's page: back in the lobby, with the way to the others. */
export function SectionEnd({ lang }: { lang: Locale }) {
  const t = lobby[lang];
  return (
    <footer className={styles.end}>
      <Backdrop soft dim={0.55} />
      <div className={styles.inner}>
        <SwellIcon className={styles.swell} />
        <p className={styles.line}>{t.endLine}</p>
        <nav aria-label={t.navLabel} className={styles.nav}>
          <a href={`/${lang}#sections`} className={cx(pill.pill, pill.plain)}>
            <ListIcon className={pill.icon} />
            <span className={pill.label}>{t.back}</span>
            <ArrowIcon className={pill.arrowBack} />
          </a>
          <a href={`/${lang}`} className={cx(pill.pill, pill.plain)}>
            <span className={styles.homeMark}>
              <Logo variant="arabic" color="orange" className={styles.homeLogo} />
            </span>
            <span className={pill.label}>{t.home}</span>
          </a>
        </nav>
        <Socials label={t.follow} className={styles.socials} />
        <p className={styles.footnote}>
          {common[lang].footer.hours} · © {YEAR} {t.rights}
        </p>
      </div>
    </footer>
  );
}
