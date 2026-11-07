import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import styles from "@/features/landing/LandingPage.module.css";
import type { Locale } from "@/i18n/config";
import { lobby } from "@/i18n/dictionaries/lobby";
import { SectionEnd } from "./SectionEnd";

export type SectionPageId = "menu" | "branches" | "points";

/**
 * One section of the landing page on a page of its own, as opened from the lobby's list, ending
 * back in the lobby.
 */
export function SectionPage({ lang, page, children }: { lang: Locale; page: SectionPageId; children: ReactNode }) {
  return (
    <div className={styles.page}>
      <SiteHeader lang={lang} page={page} />
      <main id="main">
        <h1 className={styles.srOnly}>{lobby[lang].pages[page].title}</h1>
        {children}
      </main>
      <SectionEnd lang={lang} />
    </div>
  );
}
