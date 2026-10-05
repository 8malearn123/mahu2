import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Locale } from "@/i18n/config";
import { landing } from "@/i18n/dictionaries/landing";
import { FindUs } from "./FindUs";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Loyalty } from "./Loyalty";
import { MenuSection } from "./MenuSection";
import { OrderCta } from "./OrderCta";
import { Story } from "./Story";
import styles from "./LandingPage.module.css";

type LandingPageProps = {
  lang: Locale;
  /** Show this week's limited-drop banner under the featured drinks. */
  showLimited?: boolean;
};

export function LandingPage({ lang, showLimited = true }: LandingPageProps) {
  return (
    <div className={styles.page}>
      <SiteHeader lang={lang} page="landing" />
      <Hero lang={lang} />
      <HowItWorks lang={lang} />
      <MenuSection lang={lang} showLimited={showLimited} />
      <Loyalty lang={lang} />
      <Story lang={lang} />
      <FindUs lang={lang} t={landing[lang].find} />
      <OrderCta lang={lang} />
      <SiteFooter lang={lang} onLanding />
    </div>
  );
}
