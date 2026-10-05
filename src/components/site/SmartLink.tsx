import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * In-page anchors (`#find`) stay plain links so the browser scrolls natively and fires
 * `hashchange`; everything else goes through the Next.js router.
 */
export function SmartLink({ href, ...rest }: ComponentProps<"a"> & { href: string }) {
  if (href.startsWith("#")) return <a href={href} {...rest} />;
  return <Link href={href} {...rest} />;
}
