import type { ItemId } from "./catalog";

/** The checkout's screens, in the order the two flows visit them. */
export type Screen = "menu" | "details" | "phone" | "otp" | "pay" | "confirm" | "done";

/**
 * New customers name the cup, verify their number and pay; returning customers (a number
 * verified in the last 30 days) go straight from the menu to one confirm-and-pay screen.
 */
export type Flow = "new" | "known";

export const FLOWS: Record<Flow, readonly Screen[]> = {
  new: ["menu", "details", "phone", "otp", "pay", "done"],
  known: ["menu", "confirm", "done"],
};

export type Size = "single" | "large";
export type Milk = "whole" | "oat" | "none";
export type Sweet = "none" | "light" | "sweet";
export type Pickup = "now" | "four" | "fifteen";
export type Method = "apple" | "card" | "cash";

export const SIZES: readonly Size[] = ["single", "large"];
export const MILKS: readonly Milk[] = ["whole", "oat", "none"];
export const SWEETS: readonly Sweet[] = ["none", "light", "sweet"];
export const PICKUPS: readonly Pickup[] = ["now", "four", "fifteen"];
export const METHODS: readonly Method[] = ["apple", "card", "cash"];

export type LineOptions = { size: Size; milk: Milk; sweet: Sweet; qty: number };

/** A basket line. Same shape as the "usual" the design keeps in localStorage. */
export type Line = LineOptions & { id: ItemId; price: number };

export type SavedCard = { last4: string };

export function isOneOf<T extends string>(list: readonly T[], value: unknown): value is T {
  return typeof value === "string" && (list as readonly string[]).includes(value);
}
