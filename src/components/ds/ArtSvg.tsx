import type { ComponentProps } from "react";
import type { Art } from "./logoArt";

type ArtSvgProps = Omit<ComponentProps<"svg">, "fill" | "viewBox"> & {
  art: Art;
  /** Any CSS colour, or "sunset" for the brand gradient (orange on top, coral below). */
  fill: string;
  preserveAspectRatio?: string;
};

// Every sunset-filled artwork defines the same gradient, so a repeated id is harmless.
const SUNSET_ID = "mahu-art-sunset";

/** Renders extracted brand artwork (logo lockups, line art) as one inline SVG. */
export function ArtSvg({ art, fill, ...rest }: ArtSvgProps) {
  const paint = fill === "sunset" ? `url(#${SUNSET_ID})` : fill;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={art.viewBox} fill={paint} focusable="false" {...rest}>
      {fill === "sunset" && (
        <defs>
          <linearGradient id={SUNSET_ID} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--orange-500)" />
            <stop offset="1" stopColor="var(--coral-500)" />
          </linearGradient>
        </defs>
      )}
      {art.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          transform={path.transform}
          stroke={path.strokeWidth ? paint : undefined}
          strokeWidth={path.strokeWidth}
          strokeMiterlimit={path.strokeWidth ? 10 : undefined}
        />
      ))}
    </svg>
  );
}
