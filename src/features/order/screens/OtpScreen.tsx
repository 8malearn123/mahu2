import type { RefObject } from "react";
import { Button } from "@/components/ds";
import { otpDigitLabel } from "../copy";
import type { OrderModel } from "../model";
import { OTP_LENGTH } from "../reducer";
import { ScreenIntro } from "./parts";
import ui from "./screens.module.css";

type OtpScreenProps = {
  model: OrderModel;
  /** The code cells, so the page can focus the first one when the code is sent. */
  cellRefs: RefObject<(HTMLInputElement | null)[]>;
};

export function OtpScreen({ model, cellRefs }: OtpScreenProps) {
  const { t, state, dispatch } = model;
  const focusCell = (index: number) => cellRefs.current[index]?.focus();

  return (
    <div className={ui.stack24}>
      <ScreenIntro eyebrow={t.stepOtp} title={t.otpTitle}>
        {t.otpLead}{" "}
        <span className={ui.strong} dir="ltr">
          +966 {state.phone}
        </span>
      </ScreenIntro>
      {/* Digits read left to right in both languages. */}
      <div className={ui.otpRow} dir="ltr">
        {state.otp.map((value, index) => (
          <input
            key={index}
            ref={(cell) => {
              cellRefs.current[index] = cell;
            }}
            className={ui.otpCell}
            value={value}
            inputMode="numeric"
            maxLength={1}
            aria-label={otpDigitLabel(index, t)}
            onChange={(e) => {
              const digit = e.target.value.replace(/\D/g, "").slice(-1);
              dispatch({ type: "otpCell", index, digit });
              if (digit && index < OTP_LENGTH - 1) focusCell(index + 1);
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value && index > 0) focusCell(index - 1);
            }}
            onPaste={(e) => {
              const digits = e.clipboardData.getData("text").replace(/\D/g, "");
              if (!digits) return;
              e.preventDefault();
              // A whole code fills every cell; a fragment fills from this cell on.
              const from = digits.length >= OTP_LENGTH ? 0 : index;
              dispatch({ type: "otpPaste", index, digits });
              focusCell(Math.min(from + digits.length, OTP_LENGTH) - 1);
            }}
          />
        ))}
      </div>
      {state.otpError && <span className={ui.otpWrong}>{t.otpWrong}</span>}
      <div className={ui.resendRow}>
        {state.resendIn === 0 && (
          <Button variant="secondary" size="sm" onClick={() => dispatch({ type: "resend" })}>
            {t.resend}
          </Button>
        )}
        {state.resendIn > 0 && (
          <span className={ui.resendIn}>
            {t.resendIn} {state.resendIn}s
          </span>
        )}
        <span className={ui.otpDemo}>{t.otpDemo}</span>
      </div>
    </div>
  );
}
