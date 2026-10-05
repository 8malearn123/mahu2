"use client";

import type { FormEvent } from "react";
import { Button, Checkbox, Input, RadioGroup, Select, Textarea } from "@/components/ds";
import { FormError } from "@/features/forms/FormError";
import { indexOptions, optionIndex, optionValue } from "@/features/forms/options";
import { PhoneField } from "@/features/forms/PhoneField";
import { SuccessCard } from "@/features/forms/SuccessCard";
import forms from "@/features/forms/forms.module.css";
import type { JobsDictionary } from "@/i18n/dictionaries/jobs";
import { submitApplication, type ApplicationValues } from "./application";
import { useJobsDraft } from "./JobsDraft";
import styles from "./ApplySection.module.css";

type ApplicationFormProps = {
  t: JobsDictionary["form"];
  /** Role titles, in the accordion's order. */
  roles: string[];
};

export function ApplicationForm({ t, roles }: ApplicationFormProps) {
  const { state, dispatch } = useJobsDraft();
  const { values, errors, sent } = state;

  if (sent) {
    return (
      <SuccessCard
        title={t.sentTitle}
        body={t.sentBody}
        bodyClassName={styles.sentBody}
        refLabel={t.refLabel}
        reference={sent.reference}
        detailLabel={t.roleLabel}
        detail={sent.role === null ? "" : roles[sent.role]}
      >
        <Button variant="onBrand" size="md" onClick={() => dispatch({ type: "another" })}>
          <span className={forms.buttonLabel}>{t.another}</span>
        </Button>
      </SuccessCard>
    );
  }

  const edit = (changes: Partial<ApplicationValues>) => dispatch({ type: "edit", values: changes });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = submitApplication(values);
    dispatch(result.ok ? { type: "sent", reference: result.reference } : { type: "invalid", errors: result.errors });
  }

  // The role select shows no inline error (as in the design): its message takes the form's error line.
  const formError = errors.role ? t.errRole : errors.consent ? t.errConsent : null;

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
      <Select
        label={t.roleLabel}
        value={optionValue(values.role)}
        options={indexOptions(roles, t.rolePick)}
        onChange={(event) => edit({ role: optionIndex(event.target.value) })}
      />
      <RadioGroup
        label={t.shiftLabel}
        name="shift"
        direction="row"
        value={String(values.shift)}
        options={indexOptions(t.shifts)}
        onChange={(value) => edit({ shift: Number(value) })}
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
      {formError && <FormError>{formError}</FormError>}
      <Button type="submit" variant="primary" size="lg">
        <span className={forms.buttonLabel}>{t.submit}</span>
      </Button>
      <span className={forms.fine}>{t.submitFine}</span>
    </form>
  );
}
