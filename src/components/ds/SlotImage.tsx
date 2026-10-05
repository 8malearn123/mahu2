import Image from "next/image";
import { slotImages, type SlotId } from "@/assets/slots";
import { cx } from "@/lib/cx";
import styles from "./SlotImage.module.css";

type SlotImageProps = {
  id: SlotId;
  alt: string;
  eager?: boolean;
  /** Applied to the frame, which fills its positioned parent. */
  className?: string;
};

/**
 * A photo from the design's image slots, cropped to cover its frame. The files are already sized
 * and compressed WebP, so they are served as-is.
 */
export function SlotImage({ id, alt, eager = false, className }: SlotImageProps) {
  return (
    <div className={cx(styles.frame, className)}>
      <Image src={slotImages[id]} alt={alt} fill unoptimized loading={eager ? "eager" : undefined} className={styles.image} />
    </div>
  );
}
