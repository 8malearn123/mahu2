import { DEFAULT_BRANCH, type BranchId } from "@/lib/branches";
import { getItem, type CategoryId, type ItemId } from "./catalog";
import { makeLine, quickOptions } from "./pricing";
import type { SavedOrder } from "./storage";
import {
  FLOWS,
  type Flow,
  type Line,
  type LineOptions,
  type Method,
  type Milk,
  type Pickup,
  type SavedCard,
  type Screen,
  type Size,
  type Sweet,
} from "./types";

export const OTP_LENGTH = 4;
export const RESEND_SECONDS = 30;

export type FieldError = "cupName" | "phone" | "consent" | "card" | "exp" | "cvv";
/** Which fields failed validation; the messages come from the dictionary at render time. */
export type Errors = Partial<Record<FieldError, true>>;

/** Everything here is language-neutral (ids, keys, numbers, user input), so it can cross a language switch. */
export type OrderState = {
  /** Saved details and URL params have been applied; happens once per visit. */
  hydrated: boolean;
  screen: Screen;
  /** The flow locked in when checkout left the menu; null while on the menu. */
  flow: Flow | null;
  cat: CategoryId;
  basket: readonly Line[];
  usual: Line | null;
  /** Item open in the customise sheet, and the sheet's current choices. */
  sheet: ItemId | null;
  size: Size;
  milk: Milk;
  sweet: Sweet;
  qty: number;
  cupName: string;
  pickup: Pickup;
  car: string;
  saveUsual: boolean;
  phone: string;
  consent: boolean;
  otp: readonly string[];
  /** Seconds until a new code can be requested. */
  resendIn: number;
  otpError: boolean;
  method: Method;
  card: string;
  exp: string;
  cvv: string;
  errors: Errors;
  code: string | null;
  /** What was charged, frozen when the order is placed (the receipt's "Paid" line). */
  paid: number;
  points: number;
  useReward: boolean;
  branch: BranchId;
  branchOpen: boolean;
  /** The saved number was verified in the last 30 days (with a number, that makes a returning customer). */
  verified: boolean;
  savedCard: SavedCard | null;
  editing: boolean;
  editPay: boolean;
};

const EMPTY_OTP: readonly string[] = Array.from({ length: OTP_LENGTH }, () => "");

export const initialOrderState: OrderState = {
  hydrated: false,
  screen: "menu",
  flow: null,
  cat: "espresso",
  basket: [],
  usual: null,
  sheet: null,
  size: "single",
  milk: "whole",
  sweet: "none",
  qty: 1,
  cupName: "",
  pickup: "four",
  car: "",
  saveUsual: false,
  phone: "",
  consent: true,
  otp: EMPTY_OTP,
  resendIn: 0,
  otpError: false,
  method: "apple",
  card: "",
  exp: "",
  cvv: "",
  errors: {},
  code: null,
  paid: 0,
  points: 0,
  useReward: true,
  branch: DEFAULT_BRANCH,
  branchOpen: false,
  verified: false,
  savedCard: null,
  editing: false,
  editPay: false,
};

/** Fields the screens set directly from their controls. */
type SettableField =
  | "cat"
  | "sheet"
  | "size"
  | "milk"
  | "sweet"
  | "qty"
  | "cupName"
  | "pickup"
  | "car"
  | "saveUsual"
  | "consent"
  | "method"
  | "card"
  | "exp"
  | "cvv"
  | "useReward"
  | "branch"
  | "branchOpen"
  | "editing"
  | "editPay";

export type OrderAction =
  | { type: "hydrate"; saved: SavedOrder; verified: boolean; add: ItemId | null; branch: BranchId | null }
  | { type: "set"; patch: Partial<Pick<OrderState, SettableField>> }
  | { type: "phone"; value: string }
  | { type: "openSheet"; id: ItemId }
  | { type: "addLine"; id: ItemId; options: LineOptions }
  | { type: "lineQty"; index: number; qty: number }
  | { type: "removeLine"; index: number }
  | { type: "addUsual" }
  | { type: "invalid"; errors: Errors }
  | { type: "startCheckout" }
  | { type: "detailsDone"; usual: Line | null }
  | { type: "codeSent" }
  | { type: "otpIncomplete" }
  | { type: "verified" }
  | { type: "placed"; code: string; points: number; paid: number; savedCard: SavedCard | null; usual: Line | null }
  | { type: "prev" }
  | { type: "otpCell"; index: number; digit: string }
  | { type: "otpPaste"; index: number; digits: string }
  | { type: "resend" }
  | { type: "tick" }
  | { type: "anotherNumber" }
  | { type: "startOver" };

/** A returning customer: a number on file, verified in the last 30 days. */
export function isKnown(state: OrderState): boolean {
  return state.phone !== "" && state.verified;
}

/** The locked flow during checkout; on the menu, whichever flow the customer would get now. */
export function currentFlow(state: OrderState): Flow {
  return state.flow ?? (isKnown(state) ? "known" : "new");
}

export function validate(state: OrderState): Errors {
  const errors: Errors = {};
  const { screen } = state;
  if ((screen === "details" || screen === "confirm") && !state.cupName.trim()) errors.cupName = true;
  if (screen === "phone") {
    const digits = state.phone.replace(/\D/g, "");
    if (digits.length !== 9 || digits[0] !== "5") errors.phone = true;
    if (!state.consent) errors.consent = true;
  }
  if ((screen === "pay" || (screen === "confirm" && !state.savedCard)) && state.method === "card") {
    if (state.card.replace(/\D/g, "").length !== 16) errors.card = true;
    if (!/^\d{2}\/\d{2}$/.test(state.exp)) errors.exp = true;
    if (state.cvv.replace(/\D/g, "").length !== 3) errors.cvv = true;
  }
  return errors;
}

export function otpComplete(otp: readonly string[]): boolean {
  return otp.join("").replace(/\D/g, "").length === OTP_LENGTH;
}

export function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "hydrate": {
      // React may run the mount effect twice (Strict Mode), and a draft restored after a language
      // switch is already hydrated: apply saved details and the ?add= line only once.
      if (state.hydrated) return state;
      const { saved } = action;
      const added = action.add ? getItem(action.add) : null;
      return {
        ...state,
        hydrated: true,
        branch: action.branch ?? state.branch,
        usual: saved.usual ?? state.usual,
        phone: saved.phone ?? state.phone,
        cupName: saved.cupName ?? state.cupName,
        points: saved.points ?? state.points,
        car: saved.car ?? state.car,
        pickup: saved.pickup ?? state.pickup,
        method: saved.method ?? state.method,
        savedCard: saved.savedCard ?? state.savedCard,
        verified: action.verified,
        basket: added ? [makeLine(added, quickOptions(added))] : state.basket,
      };
    }

    case "set":
      return { ...state, ...action.patch };

    case "phone":
      // A different number isn't verified (reachable by going back from pay after entering the code).
      return { ...state, phone: action.value, verified: action.value === state.phone && state.verified };

    case "openSheet": {
      const item = getItem(action.id);
      if (item.noOptions) return { ...state, basket: [...state.basket, makeLine(item, quickOptions(item))], sheet: null };
      return { ...state, sheet: item.id, size: "single", milk: "whole", sweet: "none", qty: 1 };
    }

    case "addLine":
      return { ...state, basket: [...state.basket, makeLine(getItem(action.id), action.options)], sheet: null };

    case "lineQty":
      return {
        ...state,
        basket: state.basket.map((line, i) => (i === action.index ? { ...line, qty: action.qty } : line)),
      };

    case "removeLine":
      return { ...state, basket: state.basket.filter((_, i) => i !== action.index) };

    case "addUsual": {
      if (!state.usual) return state;
      const basket = [...state.basket, { ...state.usual }];
      // Returning customers go straight to confirm-and-pay ("One tap · straight to pay").
      return isKnown(state) ? { ...state, basket, flow: "known", screen: "confirm" } : { ...state, basket };
    }

    case "invalid":
      return { ...state, errors: action.errors };

    case "startCheckout": {
      const flow = currentFlow(state);
      return { ...state, errors: {}, flow, screen: flow === "known" ? "confirm" : "details" };
    }

    case "detailsDone":
      return { ...state, errors: {}, screen: "phone", usual: action.usual ?? state.usual };

    case "codeSent":
      // A new code means the number has to be verified again.
      return {
        ...state,
        errors: {},
        screen: "otp",
        otp: EMPTY_OTP,
        otpError: false,
        resendIn: RESEND_SECONDS,
        verified: false,
      };

    case "otpIncomplete":
      return { ...state, errors: {}, otpError: true };

    case "verified":
      return { ...state, errors: {}, screen: "pay", otpError: false, resendIn: 0, verified: true };

    case "placed":
      return {
        ...state,
        errors: {},
        screen: "done",
        code: action.code,
        points: action.points,
        paid: action.paid,
        savedCard: action.savedCard,
        usual: action.usual ?? state.usual,
        editing: false,
        editPay: false,
      };

    case "prev": {
      const screens = FLOWS[currentFlow(state)];
      const i = screens.indexOf(state.screen);
      if (i <= 0) return state;
      const screen = screens[i - 1];
      return {
        ...state,
        screen,
        errors: {},
        // Back on the menu, checkout hasn't started: the flow is chosen again on the way out.
        flow: screen === "menu" ? null : state.flow,
        // Leaving the code screen drops the resend countdown.
        resendIn: state.screen === "otp" ? 0 : state.resendIn,
      };
    }

    case "otpCell":
      return { ...state, otp: state.otp.map((d, i) => (i === action.index ? action.digit : d)), otpError: false };

    case "otpPaste": {
      // A whole code fills every cell, whichever cell it was pasted into; a fragment fills from there on.
      const from = action.digits.length >= OTP_LENGTH ? 0 : action.index;
      return {
        ...state,
        otp: state.otp.map((d, i) => (i >= from && i - from < action.digits.length ? action.digits[i - from] : d)),
        otpError: false,
      };
    }

    case "resend":
      return { ...state, otp: EMPTY_OTP, otpError: false, resendIn: RESEND_SECONDS };

    case "tick":
      return state.resendIn > 0 ? { ...state, resendIn: state.resendIn - 1 } : state;

    case "anotherNumber":
      return { ...state, verified: false, phone: "", screen: "phone", editing: false, flow: "new" };

    case "startOver":
      return {
        ...state,
        screen: "menu",
        flow: null,
        basket: [],
        code: null,
        otp: EMPTY_OTP,
        card: "",
        exp: "",
        cvv: "",
      };
  }
}

// Language switch: the [lang] segment remounts the page, so the state is parked in the draft store
// and picked up on the other side. Card details are never kept.

export const DRAFT_KEY = "order";

export function toDraft(state: OrderState): OrderState {
  return { ...state, card: "", exp: "", cvv: "" };
}

export function fromDraft(draft: OrderState): OrderState {
  return { ...draft, hydrated: true };
}
