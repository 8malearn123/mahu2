import type { SlotId } from "@/assets/slots";
import type { BadgeTone } from "@/components/ds";

export type FeaturedId = "mahu-latte" | "orange" | "cold-brew";

type Featured = {
  /** The drink's id on the order page (`/order?add=<id>`). */
  id: FeaturedId;
  slot: SlotId;
  /** Price in SAR. */
  price: number;
  badgeTone: BadgeTone;
};

/** The three drinks featured in the menu section, in display order. Copy lives in the dictionary. */
export const FEATURED: readonly Featured[] = [
  { id: "mahu-latte", slot: "feat-mahu-latte", price: 18, badgeTone: "teal" },
  { id: "orange", slot: "feat-orange-coffee", price: 21, badgeTone: "coral" },
  { id: "cold-brew", slot: "feat-cold-brew", price: 17, badgeTone: "sand" },
];

/** This week's limited drop: the orange coffee. */
export const LIMITED_DROP = { id: "orange", slot: "feat-orange-coffee" } as const satisfies Pick<Featured, "id" | "slot">;

/** The sample balance shown on the points card, and the points needed for a free drink. */
export const POINTS_BALANCE = 72;
export const POINTS_GOAL = 100;
