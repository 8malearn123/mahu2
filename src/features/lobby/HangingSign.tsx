import { SwellIcon } from "./icons";
import styles from "./HangingSign.module.css";

/** A low sun hung on its own cord between the two ropes, where Heet's sign has its lantern. */
function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 160" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="lobby-sun-glow">
          <stop offset="0" stopColor="#FFC98A" stopOpacity="0.6" />
          <stop offset="0.4" stopColor="#EF964A" stopOpacity="0.18" />
          <stop offset="1" stopColor="#E86660" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lobby-sun-disc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD9A0" />
          <stop offset="0.45" stopColor="#EF964A" />
          <stop offset="1" stopColor="#E86660" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="112" r="64" fill="url(#lobby-sun-glow)" className={styles.glow} />
      <path d="M40 0V84" stroke="#FFF3E1" strokeOpacity="0.55" strokeWidth="1.6" strokeDasharray="3 2.6" />
      <circle cx="40" cy="112" r="24" fill="url(#lobby-sun-disc)" />
      <path d="M22 118c4.5-3.4 9-3.4 13.5 0s9 3.4 13.5 0 9-3.4 13.5 0" stroke="#0D0D0D" strokeOpacity="0.55" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M20 126c4.5-3.4 9-3.4 13.5 0s9 3.4 13.5 0 9-3.4 13.5 0" stroke="#0D0D0D" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The section's heading on a board in the sunset gradient, hung from two ropes under a low sun.
 * The lobby swings it in when the list comes into view.
 */
export function HangingSign({ text }: { text: string }) {
  return (
    <div data-sign className={styles.sign}>
      <div className={styles.sway}>
        <div className={styles.hang}>
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.ropes}>
            <path
              d="M14 0V100M86 0V100"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 2.6"
              vectorEffect="non-scaling-stroke"
              fill="none"
            />
          </svg>
          <Sun className={styles.sun} />
        </div>
        <div className={styles.board}>
          <div aria-hidden="true" className={styles.sheen} />
          <div aria-hidden="true" className={styles.frame} />
          <span aria-hidden="true" className={styles.nailStart} />
          <span aria-hidden="true" className={styles.nailEnd} />
          <SwellIcon className={styles.swell} />
          <h2 className={styles.text}>{text}</h2>
        </div>
      </div>
    </div>
  );
}
