"use client";

import { useEffect, useReducer, useRef, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/dictionaries/common";
import { order } from "@/i18n/dictionaries/order";
import { isBranchId } from "@/lib/branches";
import { clearDraft, readDraft, writeDraft } from "@/lib/draftStore";
import { useRiyadhHour } from "@/lib/useRiyadhHour";
import { BranchDialog } from "./BranchDialog";
import { findItem } from "./catalog";
import { CustomiseDialog } from "./CustomiseDialog";
import type { OrderModel } from "./model";
import { OrderBar } from "./OrderBar";
import { OrderHeader } from "./OrderHeader";
import { totals as getTotals } from "./pricing";
import {
  DRAFT_KEY,
  fromDraft,
  initialOrderState,
  isKnown,
  orderReducer,
  otpComplete,
  toDraft,
  validate,
  type OrderState,
} from "./reducer";
import { ConfirmScreen } from "./screens/ConfirmScreen";
import { DetailsScreen } from "./screens/DetailsScreen";
import { DoneScreen } from "./screens/DoneScreen";
import { MenuScreen } from "./screens/MenuScreen";
import { OtpScreen } from "./screens/OtpScreen";
import { PayScreen } from "./screens/PayScreen";
import { PhoneScreen } from "./screens/PhoneScreen";
import { isRecentlyVerified, persist, readSaved } from "./storage";
import styles from "./OrderApp.module.css";

/** After a language switch, carry on where the other language left off. */
function initState(): OrderState {
  const draft = readDraft<OrderState>(DRAFT_KEY);
  return draft ? fromDraft(draft) : initialOrderState;
}

type OrderAppProps = {
  lang: Locale;
  /** The site footer, rendered inside the page wrapper (above its room for the bottom bar). */
  children?: ReactNode;
};

/** The drive-thru checkout: menu → details → number → code → pay, or menu → confirm for returning customers. */
export function OrderApp({ lang, children }: OrderAppProps) {
  const [state, dispatch] = useReducer(orderReducer, undefined, initState);
  const hour = useRiyadhHour();
  const otpCells = useRef<(HTMLInputElement | null)[]>([]);
  const switchingLanguage = useRef(false);

  // Saved details (localStorage) and entry links (?add=<item>, ?branch=<id>), once per visit.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const branch = params.get("branch");
    const add = findItem(params.get("add"));
    if (params.has("add") || params.has("branch")) {
      // One-shot: a reload must not add the item again.
      window.history.replaceState(window.history.state, "", window.location.pathname);
    }
    const saved = readSaved();
    dispatch({
      type: "hydrate",
      saved,
      verified: isRecentlyVerified(saved.verifiedAt, Date.now()),
      add: add?.id ?? null,
      branch: isBranchId(branch) ? branch : null,
    });
  }, []);

  // Switching language remounts the page: park the progress so the other side picks it up.
  useEffect(() => {
    writeDraft(DRAFT_KEY, toDraft(state));
  }, [state]);

  // Leaving any other way starts the next visit afresh, as a page load did in the design.
  useEffect(
    () => () => {
      if (!switchingLanguage.current) clearDraft(DRAFT_KEY);
    },
    [],
  );

  // "New code in 30s" countdown, while the code screen is up.
  const counting = state.screen === "otp" && state.resendIn > 0;
  useEffect(() => {
    if (!counting) return;
    const timer = window.setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearInterval(timer);
  }, [counting]);

  const t = order[lang];
  const totals = getTotals(state.basket, state.points, state.useReward);
  const model: OrderModel = { lang, t, tc: common[lang], state, dispatch, totals, known: isKnown(state), hour };

  function place() {
    const digits = state.card.replace(/\D/g, "");
    const savedCard = state.method === "card" && digits.length === 16 ? { last4: digits.slice(-4) } : state.savedCard;
    const points = totals.cardAfter;
    persist({ points, car: state.car, pickup: state.pickup, method: state.method, savedCard, cupName: state.cupName });
    // The order just placed becomes "Your usual".
    const usual = state.basket[0] ? { ...state.basket[0] } : null;
    if (usual) persist({ usual });
    const code = `M-${Math.floor(Math.random() * 900 + 100)}`;
    dispatch({ type: "placed", code, points, paid: totals.total, savedCard, usual });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    const errors = validate(state);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "invalid", errors });
      return;
    }
    switch (state.screen) {
      case "menu":
        dispatch({ type: "startCheckout" });
        return;
      case "details": {
        persist({ cupName: state.cupName });
        const usual = state.saveUsual && state.basket[0] ? { ...state.basket[0] } : null;
        if (usual) persist({ usual });
        dispatch({ type: "detailsDone", usual });
        return;
      }
      case "phone":
        // The number is unverified again until the new code is entered.
        persist({ phone: state.phone, verifiedAt: 0 });
        dispatch({ type: "codeSent" });
        window.setTimeout(() => otpCells.current[0]?.focus(), 60);
        return;
      case "otp":
        if (!otpComplete(state.otp)) {
          dispatch({ type: "otpIncomplete" });
          return;
        }
        persist({ verifiedAt: Date.now() });
        dispatch({ type: "verified" });
        return;
      case "pay":
      case "confirm":
        place();
        return;
      case "done":
        return;
    }
  }

  function addUsual() {
    if (!state.usual) return;
    dispatch({ type: "addUsual" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function anotherNumber() {
    persist({ verifiedAt: 0 });
    dispatch({ type: "anotherNumber" });
  }

  return (
    <div className={styles.page}>
      <OrderHeader
        model={model}
        onLanguageSwitch={() => {
          switchingLanguage.current = true;
        }}
      />
      <main className={styles.main}>
        {state.screen === "menu" && <MenuScreen model={model} onAddUsual={addUsual} />}
        {state.screen === "details" && <DetailsScreen model={model} />}
        {state.screen === "phone" && <PhoneScreen model={model} />}
        {state.screen === "otp" && <OtpScreen model={model} cellRefs={otpCells} />}
        {state.screen === "pay" && <PayScreen model={model} />}
        {state.screen === "confirm" && <ConfirmScreen model={model} onAnotherNumber={anotherNumber} />}
        {state.screen === "done" && <DoneScreen model={model} />}
      </main>
      {state.screen !== "done" && (
        <OrderBar model={model} onPrev={() => dispatch({ type: "prev" })} onNext={next} />
      )}
      {children}
      <BranchDialog model={model} />
      <CustomiseDialog model={model} />
    </div>
  );
}
