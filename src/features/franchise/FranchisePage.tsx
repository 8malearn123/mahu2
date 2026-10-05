import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Locale } from "@/i18n/config";
import { EnquireSection } from "./EnquireSection";
import { FranchiseHero } from "./FranchiseHero";
import { PackageSection } from "./PackageSection";
import { ProofSection } from "./ProofSection";
import styles from "./FranchisePage.module.css";

export function FranchisePage({ lang }: { lang: Locale }) {
  return (
    <div className={styles.page}>
      <SiteHeader lang={lang} page="franchise" />
      <FranchiseHero lang={lang} />
      <ProofSection lang={lang} />
      <PackageSection lang={lang} />
      <EnquireSection lang={lang} />
      <SiteFooter lang={lang} />
    </div>
  );
}
