"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { AlertTriangle, Send } from "lucide-react";
import { reportPublicConflict } from "@/actions/public";
import { Button } from "@/components/ui/button";
import { NIGER_LGAS } from "@/lib/geo/niger-lgas";
import {
  publicFieldClass,
  publicHintClass,
  publicLabelClass,
  publicTextareaClass
} from "@/lib/public-ui";
import { cn } from "@/lib/utils";

export function ConflictReportForm() {
  const t = useTranslations("forms.conflict");
  const formsCommon = useTranslations("forms");
  const errors = useTranslations("forms.errors");
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    lgaName: NIGER_LGAS[0].name,
    location: "",
    description: "",
    contactName: "",
    contactPhone: "",
    contactEmail: ""
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    start(async () => {
      const result = await reportPublicConflict(form);
      if (result.success) {
        toast.success(t("success"));
        setForm({
          ...form,
          location: "",
          description: "",
          contactName: "",
          contactPhone: "",
          contactEmail: ""
        });
      } else {
        const message = errors(result.errorKey as never);
        setError(message);
        toast.error(message);
      }
    });
  }

  const required = (
    <span className="text-error" aria-label={formsCommon("required")}>
      *
    </span>
  );

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card border border-line bg-white p-6 shadow-card md:p-8"
      noValidate
    >
      <p className="flex items-start gap-3 rounded-btn border border-warning/30 bg-warning/5 p-4 text-small text-ink-muted">
        <AlertTriangle
          className="mt-0.5 h-4 w-4 shrink-0 text-warning"
          aria-hidden="true"
        />
        <span>{t("warning")}</span>
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="report-lga" className={publicLabelClass}>
            {t("lga")} {required}
          </label>
          <select
            id="report-lga"
            value={form.lgaName}
            onChange={(event) =>
              setForm({ ...form, lgaName: event.target.value })
            }
            className={cn(publicFieldClass, "mt-2")}
          >
            {NIGER_LGAS.map((lga) => (
              <option key={lga.name} value={lga.name}>
                {lga.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="report-location" className={publicLabelClass}>
            {t("location")} {required}
          </label>
          <input
            id="report-location"
            required
            value={form.location}
            onChange={(event) =>
              setForm({ ...form, location: event.target.value })
            }
            placeholder={t("locationPlaceholder")}
            className={cn(publicFieldClass, "mt-2")}
          />
        </div>
        <div>
          <label htmlFor="report-name" className={publicLabelClass}>
            {t("name")} {required}
          </label>
          <input
            id="report-name"
            required
            autoComplete="name"
            value={form.contactName}
            onChange={(event) =>
              setForm({ ...form, contactName: event.target.value })
            }
            className={cn(publicFieldClass, "mt-2")}
          />
        </div>
        <div>
          <label htmlFor="report-phone" className={publicLabelClass}>
            {t("phone")} {required}
          </label>
          <input
            id="report-phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.contactPhone}
            onChange={(event) =>
              setForm({ ...form, contactPhone: event.target.value })
            }
            className={cn(publicFieldClass, "mt-2")}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="report-email" className={publicLabelClass}>
          {t("email")}
        </label>
        <input
          id="report-email"
          type="email"
          autoComplete="email"
          value={form.contactEmail}
          onChange={(event) =>
            setForm({ ...form, contactEmail: event.target.value })
          }
          className={cn(publicFieldClass, "mt-2")}
        />
        <p className={cn(publicHintClass, "mt-1.5")}>
          {formsCommon("optional")}
        </p>
      </div>

      <div className="mt-5">
        <label htmlFor="report-description" className={publicLabelClass}>
          {t("description")} {required}
        </label>
        <textarea
          id="report-description"
          required
          minLength={20}
          value={form.description}
          onChange={(event) =>
            setForm({ ...form, description: event.target.value })
          }
          placeholder={t("descriptionPlaceholder")}
          className={cn(publicTextareaClass, "mt-2")}
        />
        <p className={cn(publicHintClass, "mt-1.5")}>{t("descriptionHint")}</p>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-btn border border-error/30 bg-error/5 px-4 py-3 text-small text-error"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" variant="green" className="mt-6" disabled={pending}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
