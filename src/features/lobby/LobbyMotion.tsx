"use client";

import { useEffect } from "react";

/**
 * The lobby's scroll, after Heet's: the intro steps back and the picture softens as the list rises
 * (`--p` runs from 0 to 1 across the intro), the sign swings in and the rows rise as they arrive.
 * The address follows along (#sections), so Back from a section, or a reload, opens on the list.
 */
export function LobbyMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-lobby]");
    const intro = document.getElementById("intro");
    const hub = document.getElementById("sections");
    if (!root || !intro || !hub) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const returning = location.hash === "#sections";
    if (returning) window.scrollTo({ top: hub.offsetTop, behavior: "instant" });

    // Rows wait below until they scroll in, unless the visitor is coming back to them.
    const revealed = root.querySelectorAll<HTMLElement>("[data-reveal], [data-sign]");
    let io: IntersectionObserver | undefined;
    if (!reduce && !returning) {
      root.dataset.motion = "on";
      io = new IntersectionObserver(
        (entries) => {
          let n = 0;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.style.transitionDelay = `${n++ * 70}ms`;
            el.dataset.shown = "true";
            io?.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -4% 0px" },
      );
      revealed.forEach((el) => io?.observe(el));
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const height = intro.offsetHeight || window.innerHeight;
      const inList = hub.getBoundingClientRect().top < window.innerHeight * 0.55;
      const p = reduce ? (inList ? 1 : 0) : Math.min(1, Math.max(0, window.scrollY / height));
      root.style.setProperty("--p", p.toFixed(4));

      const hash = inList ? "#sections" : "";
      if (location.hash !== hash) {
        history.replaceState(history.state, "", hash || location.pathname + location.search);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
      delete root.dataset.motion;
    };
  }, []);

  return null;
}
