import Image from "next/image";
import type { CSSProperties } from "react";
import coast from "@/assets/brand/hero-coast.jpg";
import { cx } from "@/lib/cx";
import { SunMotes } from "./SunMotes";
import styles from "./Backdrop.module.css";

type BackdropProps = {
  /** Pinned to the screen (the lobby) or filling its parent (the end of a section page). */
  fixed?: boolean;
  /** Start on the blurred copy instead of the photo. */
  soft?: boolean;
  /** Opacity of the ink veil over the picture. */
  dim?: number;
  /** The lobby's background is its largest paint: fetch it first. */
  preload?: boolean;
};

/**
 * The coast at dusk, drifting slowly, with specks of sun in the air: the lobby's ground, after the
 * bar in steam behind Heet's. The photo carries the MāHū wordmark at its centre, so the frame only
 * ever shows the part above it on wide screens (mountains and sea) and the part beside it on tall ones
 * (the leaves). A blurred copy waits on top for when text has to be read over it; the lobby's `--p`
 * (scroll through the intro) brings it in.
 */
export function Backdrop({ fixed = false, soft = false, dim = 0.45, preload = false }: BackdropProps) {
  const vars = { "--soft": soft ? 1 : 0, "--dim": dim } as CSSProperties;
  return (
    <div aria-hidden="true" className={cx(styles.backdrop, fixed && styles.fixed)} style={vars}>
      <div className={styles.frame}>
        <div className={styles.drift}>
          {!soft && (
            <Image
              src={coast}
              alt=""
              fill
              preload={preload}
              quality={75}
              sizes="(orientation: portrait) 320vw, 240vh"
              placeholder="blur"
              className={styles.photo}
            />
          )}
          {/* A small copy, upscaled and blurred: cheap, and soft enough to read on. */}
          <div className={styles.soft}>
            <Image src={coast} alt="" fill quality={70} sizes="200px" className={styles.softImage} />
          </div>
        </div>
      </div>
      <div className={styles.dim} />
      <div className={styles.vignette} />
      <SunMotes className={styles.motes} />
    </div>
  );
}
