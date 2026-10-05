import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "onBrand" | "accent" | "hot";
export type ButtonSize = "sm" | "md" | "lg";

type OwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container's width. */
  block?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = OwnProps & Omit<ComponentProps<"button">, keyof OwnProps> & { href?: undefined };
type ButtonAsLink = OwnProps & Omit<ComponentProps<typeof Link>, keyof OwnProps>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

type RestProps = Omit<ButtonAsButton, keyof OwnProps> | Omit<ButtonAsLink, keyof OwnProps>;

function isLinkProps(props: RestProps): props is Omit<ButtonAsLink, keyof OwnProps> {
  return props.href !== undefined;
}

/** Pill button from the Mahu design system. Pass `href` to render a link that looks the same. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", block = false, iconLeft, iconRight, className, children, ...rest } = props;
  const classes = cx(styles.button, styles[variant], styles[size], block && styles.block, className);
  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (isLinkProps(rest)) {
    const { href, ...linkProps } = rest;
    // In-page anchors stay plain links so the browser scrolls natively and fires `hashchange`.
    if (typeof href === "string" && href.startsWith("#")) {
      const { prefetch, replace, scroll, shallow, locale, legacyBehavior, passHref, onNavigate, ...anchorProps } = linkProps;
      return (
        <a href={href} {...anchorProps} className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} {...linkProps} className={classes}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest;
  return (
    <button {...buttonProps} type={type} className={classes}>
      {content}
    </button>
  );
}
