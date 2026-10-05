"use client";

import { createContext, useContext, type Dispatch, type ReactNode } from "react";
import { useDraftReducer } from "@/features/forms/useDraftReducer";
import { clearErrors, type FieldErrors } from "@/features/forms/validation";
import { EMPTY_APPLICATION, type ApplicationField, type ApplicationValues } from "./application";

// State shared by the roles accordion and the application form: "Apply for this role" preselects
// the role in the form. It is kept as a draft, so it survives switching language.

export type JobsState = {
  /** The expanded role (-1: none). The first one starts open. */
  open: number;
  values: ApplicationValues;
  errors: FieldErrors<ApplicationField>;
  /** Set once the application is sent; `role` is the role it was sent for. */
  sent: { reference: string; role: number | null } | null;
};

export type JobsAction =
  | { type: "toggleRole"; index: number }
  | { type: "chooseRole"; index: number }
  | { type: "edit"; values: Partial<ApplicationValues> }
  | { type: "invalid"; errors: FieldErrors<ApplicationField> }
  | { type: "sent"; reference: string }
  | { type: "another" };

const INITIAL: JobsState = { open: 0, values: EMPTY_APPLICATION, errors: {}, sent: null };

function reducer(state: JobsState, action: JobsAction): JobsState {
  switch (action.type) {
    case "toggleRole":
      return { ...state, open: state.open === action.index ? -1 : action.index };
    case "chooseRole":
      return { ...state, values: { ...state.values, role: action.index }, errors: {} };
    case "edit":
      return {
        ...state,
        values: { ...state.values, ...action.values },
        errors: clearErrors(state.errors, action.values),
      };
    case "invalid":
      return { ...state, errors: action.errors };
    case "sent":
      return { ...state, errors: {}, sent: { reference: action.reference, role: state.values.role } };
    case "another":
      // As in the design: availability and experience are kept.
      return {
        ...state,
        values: { ...state.values, name: "", phone: "", role: null, about: "", consent: false },
        errors: {},
        sent: null,
      };
  }
}

const JobsContext = createContext<{ state: JobsState; dispatch: Dispatch<JobsAction> } | null>(null);

export function JobsDraftProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useDraftReducer("jobs", reducer, INITIAL);
  return <JobsContext value={{ state, dispatch }}>{children}</JobsContext>;
}

export function useJobsDraft() {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobsDraft must be used inside <JobsDraftProvider>.");
  return context;
}
