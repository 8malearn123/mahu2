import type { CatalogItem } from "./catalog";
import type { Line, LineOptions, Milk, Size } from "./types";

/** Points that buy a free drink. */
export const REWARD_POINTS = 100;

/** Large size and oat milk each add 3 SAR. */
const UPCHARGE = 3;

export function unitPrice({ price, size, milk }: { price: number; size: Size; milk: Milk }): number {
  return price + (size === "large" ? UPCHARGE : 0) + (milk === "oat" ? UPCHARGE : 0);
}

export function linePrice(item: { price: number }, options: LineOptions): number {
  return unitPrice({ price: item.price, size: options.size, milk: options.milk }) * options.qty;
}

export function makeLine(item: CatalogItem, options: LineOptions): Line {
  return { id: item.id, price: item.price, size: options.size, milk: options.milk, sweet: options.sweet, qty: options.qty };
}

/** "Add" without customising: one single, whole milk (no milk for beans), unsweetened. */
export function quickOptions(item: CatalogItem): LineOptions {
  return { size: "single", milk: item.noOptions ? "none" : "whole", sweet: "none", qty: 1 };
}

export type Totals = {
  subtotal: number;
  /** Drinks in the basket (sum of quantities). */
  cups: number;
  /** Free-drink discount: the cheapest unit price, once there are 100 points to spend. */
  reward: number;
  /** One point per riyal. */
  earned: number;
  total: number;
  /** Points balance once this order is paid. */
  cardAfter: number;
};

export function totals(basket: readonly Line[], points: number, useReward: boolean): Totals {
  const subtotal = basket.reduce((sum, line) => sum + linePrice(line, line), 0);
  const cups = basket.reduce((n, line) => n + line.qty, 0);
  const reward =
    points < REWARD_POINTS || !useReward || basket.length === 0 ? 0 : Math.min(...basket.map((line) => unitPrice(line)));
  const earned = Math.round(subtotal);
  return {
    subtotal,
    cups,
    reward,
    earned,
    total: Math.max(0, subtotal - reward),
    cardAfter: points - (reward > 0 ? REWARD_POINTS : 0) + earned,
  };
}

/** Points still needed for the next free drink (a full 100 right after one). */
export function pointsToGo(points: number): number {
  return (REWARD_POINTS - (points % REWARD_POINTS)) % REWARD_POINTS || REWARD_POINTS;
}

/** Progress-bar width toward the next free drink. */
export function pointsFill(points: number): string {
  return `${Math.min(100, Math.round(((points % REWARD_POINTS) / REWARD_POINTS) * 100))}%`;
}

/** This order takes the customer past 100 points. */
export function isOneAway(points: number, earned: number, basket: readonly Line[]): boolean {
  return points < REWARD_POINTS && points + earned >= REWARD_POINTS && basket.length > 0;
}
