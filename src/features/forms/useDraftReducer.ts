import { useEffect, useReducer } from "react";
import { readDraft, writeDraft } from "@/lib/draftStore";

/**
 * `useReducer` whose state survives the remount caused by switching language: it starts from the
 * draft saved under `key`, if any, and saves every change back. Keep the state language-neutral.
 */
export function useDraftReducer<State, Action>(
  key: string,
  reducer: (state: State, action: Action) => State,
  initial: State,
) {
  const [state, dispatch] = useReducer(reducer, key, (draftKey: string) => readDraft<State>(draftKey) ?? initial);

  useEffect(() => {
    writeDraft(key, state);
  }, [key, state]);

  return [state, dispatch] as const;
}
