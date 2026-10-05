"use client";

import type { FormEvent } from "react";
import { Button, Checkbox, Input, RadioGroup, Select, Textarea } from "@/components/ds";
import { FormError } from "@/features/forms/FormError";
import { indexOptions, optionIndex, optionValue } from "@/features/forms/options";
import { PhoneField } from "@/features/forms/PhoneField";
import { SuccessCard } from "@/features/forms/SuccessCard";
import { useDraftReducer } from "@/features/forms/useDraftReducer";
import { clearErrors, type FieldErrors } from "@/features/forms/validation";
import forms from "@/features/forms/forms.module.css";
import type { FranchiseDictionary } from "@/i18n/dictionaries/franchise";
import { EMPTY_ENQUIRY, FRANCHISE_EMAIL, submitEnquiry, type EnquiryField, type EnquiryValues } from "./enquiry";
import styles from "./EnquireSection.module.css";

// Kept as a draft, so the enquiry survives switching language.
type EnquiryState = {
  values: EnquiryValues;
  errors: FieldErrors<EnquiryField>;
  /** Set once the enquiry is sent; `city` is the city it was sent for. */
  sent: { reference: string; city: number | null } | null;
};

type EnquiryAction =
  | { type: "edit"; values: Partial<EnquiryValues> }
  | { type: "invalid"; errors: FieldErrors<EnquiryField> }
  | { type: "sent"; reference: string };

const INITIAL: EnquiryState = { values: EMPTY_ENQUIRY, errors: {}, sent: null };

function reducer(state: EnquiryState, action: EnquiryAction): EnquiryState {
  switch (action.type) {
    case "edit":
      return {
        ...state,
        values: { ...state.values, ...action.values },
        errors: clearErrors(state.errors, action.values),
      };
    case "invalid":
      return { ...state, errors: action.errors };
    case "sent":
      return { ...state, errors: {}, sent: { reference: action.reference, city: state.values.city } };
  }
}

export function EnquiryForm({ t }: { t: FranchiseDictionary["form"] }) {
  const [{ values, errors, sent }, dispatch] = useDraftReducer("franchise", reducer, INITIAL);

  if (sent) {
    return (
      <SuccessCard
        title={t.sentTitle}
        body={t.sentBody}
        bodyClassName={styles.sentBody}
        refLabel={t.refLabel}
        reference={sent.reference}
        detailLabel={t.cityLabel}
        detail={sent.city === null ? "" : t.cities[sent.city]}
      >
        <a href={`mailto:${FRANCHISE_EMAIL}`} className={styles.sentMail}>
          {t.sentMail}
        </a>
      </SuccessCard>
    );
  }

  const edit = (changes: Partial<EnquiryValues>) => dispatch({ type: "edit", values: changes });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = submitEnquiry(values);
    dispatch(result.ok ? { type: "sent", reference: result.reference } : { type: "invalid", errors: result.errors });
  }

  return (
    <form className={forms.card} noValidate onSubmit={handleSubmit}>
      <Input
        label={t.nameLabel}
        placeholder={t.namePlaceholder}
        autoComplete="name"
        value={values.name}
        error={errors.name && t.errName}
        onChange={(event) => edit({ name: event.target.value })}
      />
      <PhoneField
        label={t.phoneLabel}
        value={values.phone}
        error={errors.phone && t.errPhone}
        onChange={(phone) => edit({ phone })}
      />
      {/* The design dropped these two selects' errors (and the hint); they show now. */}
      <Select
        label={t.cityLabel}
        value={optionValue(values.city)}
        options={indexOptions(t.cities, t.cityPick)}
        error={errors.city && t.errCity}
        onChange={(event) => edit({ city: optionIndex(event.target.value) })}
      />
      <Select
        label={t.capitalLabel}
        hint={t.capitalHint}
        value={optionValue(values.capital)}
        options={indexOptions(t.capitals, t.capitalPick)}
        error={errors.capital && t.errCapital}
        onChange={(event) => edit({ capital: optionIndex(event.target.value) })}
      />
      <RadioGroup
        label={t.siteLabel}
        name="site"
        direction="row"
        value={String(values.site)}
        options={indexOptions(t.sites)}
        onChange={(value) => edit({ site: Number(value) })}
      />
      <Select
        label={t.expLabel}
        value={optionValue(values.exp)}
        options={indexOptions(t.exps, t.expPick)}
        onChange={(event) => edit({ exp: optionIndex(event.target.value) })}
      />
      <Textarea
        label={t.aboutLabel}
        placeholder={t.aboutPlaceholder}
        hint={t.aboutHint}
        value={values.about}
        onChange={(event) => edit({ about: event.target.value })}
      />
      <Checkbox
        label={t.consent}
        checked={values.consent}
        onChange={(event) => edit({ consent: event.target.checked })}
      />
      {errors.consent && <FormError>{t.errConsent}</FormError>}
      <Button type="submit" variant="primary" size="lg">
        <span className={forms.buttonLabel}>{t.submit}</span>
      </Button>
      <span className={forms.fine}>{t.submitFine}</span>
    </form>
  );
}
