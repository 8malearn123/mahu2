"use client";

import Link from "next/link";
import { useState } from "react";
import { SlotImage } from "@/components/ds";
import { LocateIcon, NavigateIcon } from "@/components/icons";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import type { LandingDictionary } from "@/i18n/dictionaries/landing";
import {
  BRANCHES,
  directionsUrl,
  distanceKm,
  formatKm,
  isOpenAt,
  nearestBranch,
  statusLabel,
  type LatLng,
} from "@/lib/branches";
import { cx } from "@/lib/cx";
import { readDraft, writeDraft } from "@/lib/draftStore";
import { useRiyadhHour } from "@/lib/useRiyadhHour";
import styles from "./FindUs.module.css";

// The visitor's position survives a language switch (which remounts the page).
const HERE_DRAFT = "landing.here";

type FindUsProps = {
  lang: Locale;
  t: LandingDictionary["find"];
};

/** The four windows, with live open/closed status and an optional "nearest to me" lookup. */
export function FindUs({ lang, t }: FindUsProps) {
  const hour = useRiyadhHour();
  const [here, setHere] = useState<LatLng | null>(() => readDraft<LatLng>(HERE_DRAFT) ?? null);
  const [locating, setLocating] = useState<"idle" | "busy" | "failed">("idle");

  function locate() {
    if (!navigator.geolocation) return;
    setLocating("busy");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = { lat: position.coords.latitude, lng: position.coords.longitude };
        writeDraft(HERE_DRAFT, next);
        setHere(next);
        setLocating("idle");
      },
      () => setLocating("failed"),
      { timeout: 8000 },
    );
  }

  const locateLabel = locating === "busy" ? t.locating : locating === "failed" ? t.locateOff : t.locate;
  const nearestId = here ? nearestBranch(here).id : null;
  const orderPath = localePath(lang, "/order");

  return (
    <section id="find" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 className={styles.title}>
              {t.titleA}
              <br />
              {t.titleB}
            </h2>
            <span className={styles.count}>{t.count}</span>
          </div>
          <button type="button" className={styles.locate} onClick={locate}>
            <LocateIcon size={18} />
            {locateLabel}
          </button>
        </div>

        <div className={styles.grid}>
          {BRANCHES.map((branch) => {
            const copy = branch[lang];
            const nearest = branch.id === nearestId;
            const open = hour !== null && isOpenAt(branch, hour);
            return (
              <div key={branch.id} className={cx(styles.card, nearest && styles.cardNearest)}>
                <div className={styles.photo}>
                  <SlotImage id={`branch-${branch.id}`} alt={copy.name} />
                  {nearest && <span className={styles.nearestTag}>{t.nearestTag}</span>}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.info}>
                    {/* Empty until the Jazan hour is known on the client. */}
                    <div className={styles.status}>
                      {hour !== null && (
                        <>
                          <span className={cx(styles.dot, !open && styles.dotClosed)} />
                          <span className={cx(styles.statusText, !open && styles.statusTextClosed)}>
                            {statusLabel(branch, hour, lang)}
                          </span>
                        </>
                      )}
                    </div>
                    <span className={styles.name}>{copy.name}</span>
                    <span className={styles.area}>{copy.area}</span>
                    {here && (
                      <span className={styles.km} dir="ltr">
                        {formatKm(distanceKm(here, branch), lang)}
                      </span>
                    )}
                  </div>
                  <div className={styles.actions}>
                    <Link href={`${orderPath}?branch=${branch.id}`} className={styles.orderHere}>
                      {t.orderHere}
                    </Link>
                    <a href={directionsUrl(branch)} target="_blank" rel="noopener" className={styles.directions}>
                      <NavigateIcon size={16} />
                      {common[lang].directions}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
