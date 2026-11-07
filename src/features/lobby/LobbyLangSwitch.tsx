"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/config";
import styles from "./Lobby.module.css";

type LobbyLangSwitchProps = {
  /** The lobby in the other language. */
  href: string;
  lang: Locale;
  label: string;
  text: string;
};

/**
 * The other language, in a round button at the top corner: from the list of sections, to its list.
 * Steps out of the way on the way down and comes back on the way up.
 */
export function LobbyLangSwitch({ href, lang, label, text }: LobbyLangSwitchProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const el = ref.current;
      const y = window.scrollY;
      if (!el || Math.abs(y - lastY) < 4) return;
      el.dataset.hidden = y > lastY && y > window.innerHeight * 0.4 ? "true" : "false";
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      hrefLang={lang}
      lang={lang}
      aria-label={label}
      data-hidden="false"
      onClick={(event) => {
        if (!location.hash || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        location.href = href + location.hash;
      }}
      className={styles.langSwitch}
    >
      {text}
    </a>
  );
}
