import { slotImages, type SlotId } from "@/assets/slots";

export type CategoryId = "espresso" | "filter" | "cold";

export type ItemId =
  | "mahu-latte"
  | "flat-white"
  | "cortado"
  | "spanish-latte"
  | "v60"
  | "batch"
  | "beans"
  | "orange"
  | "iced-spanish"
  | "cold-brew"
  | "matcha";

export type CatalogItem = {
  id: ItemId;
  /** Base price in SAR: single size, whole milk. */
  price: number;
  /** Photo on the menu row and in the customise sheet. */
  slot: SlotId;
  /** Carries the "Most ordered" badge. */
  badge?: boolean;
  /** Carries the "Limited" badge. */
  limited?: boolean;
  /** Sold as is (beans): no customise sheet, and no milk. */
  noOptions?: boolean;
};

export const CATEGORIES: readonly CategoryId[] = ["espresso", "filter", "cold"];

export const CATALOG: Record<CategoryId, readonly CatalogItem[]> = {
  espresso: [
    { id: "mahu-latte", price: 18, badge: true, slot: "feat-mahu-latte" },
    { id: "flat-white", price: 16, slot: "item-flat-white" },
    { id: "cortado", price: 14, slot: "item-cortado" },
    { id: "spanish-latte", price: 18, slot: "item-spanish-latte" },
  ],
  filter: [
    { id: "v60", price: 22, slot: "item-v60" },
    { id: "batch", price: 14, slot: "item-batch" },
    { id: "beans", price: 68, noOptions: true, slot: "item-beans" },
  ],
  cold: [
    { id: "orange", price: 21, limited: true, slot: "feat-orange-coffee" },
    { id: "iced-spanish", price: 19, slot: "item-iced-spanish" },
    { id: "cold-brew", price: 17, slot: "feat-cold-brew" },
    { id: "matcha", price: 20, slot: "item-matcha" },
  ],
};

/** The "Most ordered" card on the menu, and its larger photo. */
export const HERO_ITEM_ID: ItemId = "mahu-latte";
export const HERO_SLOT: SlotId = "hero-mahu-latte";

const ITEMS = new Map<string, CatalogItem>(
  CATEGORIES.flatMap((category) => CATALOG[category]).map((item) => [item.id, item]),
);

/** The catalog entry for an id from outside (URL, storage), if there is one. */
export function findItem(id: string | null | undefined): CatalogItem | undefined {
  return id ? ITEMS.get(id) : undefined;
}

export function getItem(id: ItemId): CatalogItem {
  const item = ITEMS.get(id);
  if (!item) throw new Error(`Unknown menu item: ${id}`);
  return item;
}

function isSlotId(id: string): id is SlotId {
  return Object.hasOwn(slotImages, id);
}

/**
 * Thumbnail on the "Your usual" card. The design pointed at `drink-<id>`, which only exists for
 * some drinks; the others fall back to their menu photo instead of an empty frame.
 */
export function usualSlot(id: ItemId): SlotId {
  const drink = `drink-${id}`;
  return isSlotId(drink) ? drink : getItem(id).slot;
}
