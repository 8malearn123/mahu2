"use client";

import { useEffect, useRef, useState } from "react";
import { Logo, SceneBand } from "@/components/ds";
import { fill } from "@/i18n/config";
import type { LandingDictionary } from "@/i18n/dictionaries/landing";
import { POINTS_BALANCE, POINTS_GOAL } from "./data";
import styles from "./PointsCard.module.css";

type PointsCardProps = {
  t: LandingDictionary["loyalty"]["card"];
};

/** The sample points card. Its progress bar fills the first time the card is mostly in view. */
export function PointsCard({ t }: PointsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const filled = (POINTS_BALANCE / POINTS_GOAL) * 100;

  return (
    <div ref={cardRef} className={styles.card}>
      <div className={styles.header}>
        <Logo color="cream" height={22} />
        <span className={styles.label}>{t.label}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.balanceRow}>
          <span className={styles.balanceLabel}>{t.balance}</span>
          <span className={styles.rule}>{t.rule}</span>
        </div>
        <div className={styles.pointsRow}>
          <span className={styles.points} dir="ltr">
            {POINTS_BALANCE}
          </span>
          <span className={styles.unit}>{t.unit}</span>
        </div>
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${revealed ? filled : 0}%` }} />
        </div>
        <span className={styles.toGo}>{fill(t.toGo, { n: POINTS_GOAL - POINTS_BALANCE })}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.footer}>
        <span className={styles.footerTitle}>{t.footer}</span>
      </div>
      <SceneBand scene="sunset" height={10} />
    </div>
  );
}
