import type { ReactNode, SVGProps } from "react";
import { cx } from "@/lib/cx";

// The design's inline icons (Lucide-style, 2px stroke, currentColor), drawn on a 24-unit grid.

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  size?: number;
  /** Mirror in right-to-left layouts (for icons that point "forward" or "back"). */
  flip?: boolean;
};

function icon(paths: ReactNode, defaults: { flip?: boolean } = {}) {
  function Icon({ size = 20, flip = defaults.flip ?? false, className, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className={cx(flip && "flip-rtl", className)}
        {...rest}
      >
        {paths}
      </svg>
    );
  }
  return Icon;
}

export const ArrowIcon = icon(
  <>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </>,
  { flip: true },
);

export const BackIcon = icon(
  <>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </>,
  { flip: true },
);

export const ArrowDownIcon = icon(
  <>
    <path d="M12 5v14" />
    <path d="M5 12l7 7 7-7" />
  </>,
);

export const ChevronDownIcon = icon(<path d="M6 9l6 6 6-6" />);

export const MenuIcon = icon(
  <>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </>,
);

export const CloseIcon = icon(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>,
);

export const CheckIcon = icon(<path d="M20 6L9 17l-5-5" />);

/** The bolder tick used on form success cards. */
export const SuccessIcon = icon(<path d="M4 12.5l5 5L20 6.5" />);

export const PinIcon = icon(
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>,
);

export const LocateIcon = icon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    <circle cx="12" cy="12" r="8" />
  </>,
);

export const NavigateIcon = icon(<path d="M3 11l19-8-8 19-2-9-9-2Z" />);
