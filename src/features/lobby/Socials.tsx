import type { ComponentType } from "react";
import { cx } from "@/lib/cx";
import { SOCIAL, type SocialAccount } from "@/lib/social";
import { InstagramIcon, SnapchatIcon, TikTokIcon, WhatsAppIcon, XIcon } from "./icons";
import styles from "./Socials.module.css";

const ACCOUNTS: { id: SocialAccount; name: string; Icon: ComponentType<{ className?: string }> }[] = [
  { id: "instagram", name: "Instagram", Icon: InstagramIcon },
  { id: "tiktok", name: "TikTok", Icon: TikTokIcon },
  { id: "snapchat", name: "Snapchat", Icon: SnapchatIcon },
  { id: "x", name: "X", Icon: XIcon },
  { id: "whatsapp", name: "WhatsApp", Icon: WhatsAppIcon },
];

/** Mahu's accounts as a row of cream buttons. One without a link yet shows, but doesn't click. */
export function Socials({ label, className }: { label: string; className?: string }) {
  return (
    <ul aria-label={label} className={cx(styles.list, className)}>
      {ACCOUNTS.map(({ id, name, Icon }) => {
        const href = SOCIAL[id];
        return (
          <li key={id}>
            {href ? (
              <a href={href} target="_blank" rel="noopener" aria-label={name} className={styles.button}>
                <Icon className={styles.icon} />
              </a>
            ) : (
              <span role="img" aria-label={name} className={styles.button}>
                <Icon className={styles.icon} />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
