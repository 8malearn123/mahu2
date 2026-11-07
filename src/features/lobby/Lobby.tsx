import type { CSSProperties } from "react";
import { Logo } from "@/components/ds";
import { otherLocale, type Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { lobby } from "@/i18n/dictionaries/lobby";
import { cx } from "@/lib/cx";
import { Backdrop } from "./Backdrop";
import { Hub } from "./Hub";
import { ChevronIcon } from "./icons";
import { LobbyLangSwitch } from "./LobbyLangSwitch";
import { LobbyMotion } from "./LobbyMotion";
import { Socials } from "./Socials";
import styles from "./Lobby.module.css";

/** Entrance delay for one piece of the intro (`--d`). */
const at = (delay: string) => ({ "--d": delay }) as CSSProperties;

/**
 * The home page, after effect.sa's link-in-bio and the lobby built for Heet: the logo and the
 * headline over the coast at dusk, then, under the "من جازان" sign, the list of sections, each of
 * which opens on a page of its own.
 */
export function Lobby({ lang }: { lang: Locale }) {
  const t = lobby[lang];
  const hero = landing[lang].hero;
  const other = otherLocale(lang);

  return (
    <div data-lobby className={styles.lobby}>
      <a href="#sections" className={styles.skip}>
        {t.skip}
      </a>
      <Backdrop fixed preload />
      <LobbyLangSwitch href={`/${other}`} lang={other} label={t.langLabel} text={lang === "ar" ? "EN" : "ع"} />

      <main id="main" className={styles.main}>
        <section id="intro" className={styles.intro}>
          <div data-intro-content className={styles.introContent}>
            <div className={styles.on} style={at(".5s")}>
              <Logo variant="stacked" color="cream" className={styles.logo} />
            </div>
            <h1 className={cx(styles.tagline, styles.rise)} style={at("1.1s")}>
              {hero.titleA}
              <br />
              {hero.titleB}
            </h1>
            <a href="#sections" className={cx(styles.enter, styles.rise)} style={at("1.5s")}>
              {hero.learnMore}
              <ChevronIcon className={styles.enterIcon} />
            </a>
            <div className={styles.rise} style={at("1.7s")}>
              <Socials label={t.follow} className={styles.introSocials} />
            </div>
          </div>
          <div data-intro-content className={styles.sinceRow}>
            <p className={cx(styles.since, styles.rise)} style={at("2s")}>
              {t.since}
            </p>
          </div>
        </section>

        <Hub lang={lang} />
      </main>
      <LobbyMotion />
    </div>
  );
}
