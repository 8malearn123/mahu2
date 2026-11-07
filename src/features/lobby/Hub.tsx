import type { ComponentType } from "react";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { landing } from "@/i18n/dictionaries/landing";
import { lobby } from "@/i18n/dictionaries/lobby";
import { BRANCHES, directionsUrl } from "@/lib/branches";
import { cx } from "@/lib/cx";
import { Choice } from "./Choice";
import { HangingSign } from "./HangingSign";
import {
  ArrowIcon,
  BagIcon,
  BriefcaseIcon,
  CarIcon,
  ChevronIcon,
  CupIcon,
  GiftIcon,
  PinIcon,
  StarIcon,
  StoreIcon,
  WaveIcon,
} from "./icons";
import { Socials } from "./Socials";
import pill from "./pill.module.css";
import styles from "./Lobby.module.css";

type Icon = ComponentType<{ className?: string }>;

/** Rendered at build time; the pages are static. */
const YEAR = new Date().getFullYear();

/** One row of the list: a page of the site. Plain links, so pages cross-fade into one another. */
function Row({ href, label, Icon }: { href: string; label: string; Icon: Icon }) {
  return (
    <li data-reveal>
      <a href={href} className={cx(pill.pill, pill.plain)}>
        <Icon className={pill.icon} />
        <span className={pill.label}>{label}</span>
        <ArrowIcon className={pill.arrow} />
      </a>
    </li>
  );
}

/**
 * The list of sections under the "من جازان" sign: Mahu's own link-in-bio, after effect.sa's and
 * Heet's. Ordering leads; each other row opens a page of its own, or a few outside links.
 */
export function Hub({ lang }: { lang: Locale }) {
  const t = lobby[lang];
  const story = landing[lang].story;
  const home = `/${lang}`;

  return (
    <section id="sections" className={styles.hub}>
      <HangingSign text={story.title} />

      <p data-reveal className={styles.body}>
        {story.body}
      </p>

      <nav aria-label={t.navLabel} className={styles.nav}>
        <ul className={styles.list}>
          <li data-reveal>
            <a href={`${home}/order`} className={cx(pill.pill, pill.featured)}>
              <BagIcon className={pill.iconLarge} />
              <span className={pill.label}>
                <span className={pill.labelStrong}>{t.order}</span>
                <span className={pill.note}>{t.orderNote}</span>
              </span>
              <ArrowIcon className={pill.arrow} />
            </a>
          </li>
          <Row href={`${home}/menu`} label={t.menu} Icon={CupIcon} />
          <Row href={`${home}/branches`} label={t.branches} Icon={PinIcon} />
          <li data-reveal>
            <Choice
              icon={<CarIcon className={pill.icon} />}
              label={t.directions}
              options={BRANCHES.map((branch) => ({ label: branch[lang].name, href: directionsUrl(branch) }))}
            />
          </li>
          <Row href={`${home}/points`} label={t.points} Icon={GiftIcon} />
          <Row href={`${home}/journey`} label={t.journey} Icon={WaveIcon} />
          <Row href={`${home}/jobs`} label={t.jobs} Icon={BriefcaseIcon} />
          <Row href={`${home}/franchise`} label={t.franchise} Icon={StoreIcon} />
          <li data-reveal>
            <div className={cx(pill.pill, pill.soon)}>
              <StarIcon className={pill.icon} />
              <span className={pill.label}>{t.review}</span>
              <span className={pill.badge}>{t.soon}</span>
            </div>
          </li>
        </ul>
      </nav>

      <div data-reveal className={styles.homeRow}>
        <a href="#intro" className={cx(pill.pill, pill.plain, styles.homeLink)}>
          <ChevronIcon up className={pill.icon} />
          {t.home}
        </a>
      </div>

      <Socials label={t.follow} className={styles.hubSocials} />
      <p className={styles.footnote}>
        {common[lang].footer.hours} · © {YEAR} {t.rights}
      </p>
    </section>
  );
}
