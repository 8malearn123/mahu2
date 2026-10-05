import { findItem } from "./catalog";
import { makeLine } from "./pricing";
import {
  isOneOf,
  METHODS,
  MILKS,
  PICKUPS,
  SIZES,
  SWEETS,
  type Line,
  type Method,
  type Pickup,
  type SavedCard,
} from "./types";

// What the order page remembers on this device, under the design's key and schema.

export const STORE_KEY = "mahu.order.v1";

/** A verified number is trusted for this long. */
const VERIFY_DAYS = 30;
const DAY_MS = 864e5;

export type SavedOrder = {
  usual?: Line;
  phone?: string;
  cupName?: string;
  points?: number;
  car?: string;
  pickup?: Pickup;
  method?: Method;
  savedCard?: SavedCard | null;
  verifiedAt?: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStore(): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    return isRecord(value) ? value : {};
  } catch {
    return {};
  }
}

function readLine(value: unknown): Line | undefined {
  if (!isRecord(value)) return undefined;
  const item = findItem(typeof value.id === "string" ? value.id : null);
  const { size, milk, sweet, qty } = value;
  if (!item || !isOneOf(SIZES, size) || !isOneOf(MILKS, milk) || !isOneOf(SWEETS, sweet)) return undefined;
  if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > 99) return undefined;
  return makeLine(item, { size, milk, sweet, qty });
}

function readCard(value: unknown): SavedCard | undefined {
  if (!isRecord(value) || typeof value.last4 !== "string" || !/^\d{4}$/.test(value.last4)) return undefined;
  return { last4: value.last4 };
}

/** The saved fields the page picks up on load (empty values are skipped, as in the design). */
export function readSaved(): SavedOrder {
  const raw = readStore();
  const saved: SavedOrder = {};
  const usual = readLine(raw.usual);
  if (usual) saved.usual = usual;
  if (typeof raw.phone === "string" && raw.phone) saved.phone = raw.phone.replace(/[^\d ]/g, "").slice(0, 11);
  if (typeof raw.cupName === "string" && raw.cupName) saved.cupName = raw.cupName;
  if (typeof raw.points === "number" && Number.isFinite(raw.points)) saved.points = raw.points;
  if (typeof raw.car === "string" && raw.car) saved.car = raw.car;
  if (isOneOf(PICKUPS, raw.pickup)) saved.pickup = raw.pickup;
  if (isOneOf(METHODS, raw.method)) saved.method = raw.method;
  const card = readCard(raw.savedCard);
  if (card) saved.savedCard = card;
  if (typeof raw.verifiedAt === "number" && raw.verifiedAt > 0) saved.verifiedAt = raw.verifiedAt;
  return saved;
}

/** Merge fields into the saved record. Storage can be unavailable (private mode, quota); then nothing is kept. */
export function persist(patch: SavedOrder): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(Object.assign(readStore(), patch)));
  } catch {
    // Nothing to do: the page works without storage.
  }
}

export function isRecentlyVerified(verifiedAt: number | undefined, now: number): boolean {
  return !!verifiedAt && now - verifiedAt < VERIFY_DAYS * DAY_MS;
}
