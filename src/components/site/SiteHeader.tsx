"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Button, Logo } from "@/components/ds";
import { ArrowIcon, CloseIcon, MenuIcon } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { cx } from "@/lib/cx";
import { LanguageSwitch } from "./LanguageSwitch";
import { SmartLink as NavLink } from "./SmartLink";
import styles from "./SiteHeader.module.css";

type Page = "landing" | "jobs" | "franchise";
type NavKey = "menu" | "find" | "jobs" | "franchise";

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** Where each nav item goes. A page's own item scrolls within it. */
function navHref(key: NavKey, page: Page, lang: Locale): string {
  const home = `/${lang}`;
  switch (key) {
    case "menu":
      return page === "landing" ? "#menu" : `${home}#menu`;
    case "find":
      return page === "landing" ? "#find" : `${home}#find`;
    case "jobs":
      return page === "jobs" ? "#roles" : `${home}/jobs`;
    case "franchise":
      return page === "franchise" ? "#proof" : `${home}/franchise`;
  }
}

type SiteHeaderProps = {
  lang: Locale;
  page: Page;
};

/**
 * Fixed site header. Desktop (≥ 900px) shows the nav bar; smaller screens get a compact bar and a
 * full-screen menu. On the landing page it starts transparent over the hero and turns teal once
 * the page scrolls.
 */
export function SiteHeader({ lang, page }: SiteHeaderProps) {
  const t = common[lang];
  const overlay = page === "landing";
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 24, () => false);
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");

  const keys: NavKey[] = ["menu", "find", "jobs", "franchise"];
  const items = keys.map((key) => ({ key, label: t.nav[key], href: navHref(key, page, lang) }));
  const active: NavKey =
    page === "landing" ? (keys.find((key) => hash === `#${key}`) ?? "menu") : page;
  const logoHref = overlay ? "#top" : `/${lang}`;
  const orderHref = `/${lang}/order`;

  return (
    <>
      <div className={cx(styles.fixed, overlay && styles.overlay, scrolled && styles.scrolled, menuOpen && styles.open)}>
        <header className={styles.desktop}>
          <NavLink href={logoHref} aria-label="Mahu" className={styles.logoLink}>
            <Logo color="cream" height={28} eager />
          </NavLink>
          <nav className={styles.nav}>
            {items.map((item) => (
              <NavLink
                key={item.key}
                href={item.href}
                aria-current={item.key === active ? "true" : undefined}
                className={styles.navItem}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className={styles.right}>
            <LanguageSwitch lang={lang} className={styles.langPill} />
            <Button variant="onBrand" size="sm" href={orderHref} className={styles.orderButton}>
              {t.order}
            </Button>
          </div>
        </header>

        <div className={styles.mobile}>
          <div className={styles.mobileBar}>
            <NavLink href={logoHref} aria-label="Mahu" className={styles.logoLink}>
              <Logo color="cream" height={26} eager />
            </NavLink>
            <LanguageSwitch lang={lang} className={styles.mobileLang} />
            <button
              type="button"
              className={styles.menuButton}
              aria-label={t.menuLabel}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          {menuOpen && (
            <nav className={styles.mobileMenu}>
              {items.map((item) => (
                <NavLink
                  key={item.key}
                  href={item.href}
                  className={styles.menuItem}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <ArrowIcon size={18} />
                </NavLink>
              ))}
              <Link href={orderHref} className={styles.menuOrder}>
                {t.order}
              </Link>
            </nav>
          )}
        </div>
      </div>
      {!overlay && <div className={styles.spacer} aria-hidden="true" />}
    </>
  );
}
