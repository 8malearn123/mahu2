import type { Dispatch } from "react";
import type { Locale } from "@/i18n/config";
import type { CommonDictionary } from "@/i18n/dictionaries/common";
import type { OrderDictionary } from "@/i18n/dictionaries/order";
import type { Totals } from "./pricing";
import type { OrderAction, OrderState } from "./reducer";

/** What every part of the order page renders from. */
export type OrderModel = {
  lang: Locale;
  t: OrderDictionary;
  tc: CommonDictionary;
  state: OrderState;
  dispatch: Dispatch<OrderAction>;
  totals: Totals;
  /** Returning customer: a number verified in the last 30 days. */
  known: boolean;
  /** Hour in Jazan for branch opening times; null until the page has hydrated. */
  hour: number | null;
};
