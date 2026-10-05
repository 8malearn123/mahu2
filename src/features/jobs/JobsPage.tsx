import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Locale } from "@/i18n/config";
import { ApplySection } from "./ApplySection";
import { JobsDraftProvider } from "./JobsDraft";
import { JobsHero } from "./JobsHero";
import { LifeSection } from "./LifeSection";
import { RolesSection } from "./RolesSection";
import styles from "./JobsPage.module.css";

export function JobsPage({ lang }: { lang: Locale }) {
  return (
    <div className={styles.page}>
      <SiteHeader lang={lang} page="jobs" />
      <JobsHero lang={lang} />
      <LifeSection lang={lang} />
      <JobsDraftProvider>
        <RolesSection lang={lang} />
        <ApplySection lang={lang} />
      </JobsDraftProvider>
      <SiteFooter lang={lang} />
    </div>
  );
}
