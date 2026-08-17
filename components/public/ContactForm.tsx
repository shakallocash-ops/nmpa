"use client";

import { useMemo, useState, useTransition, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Mail, Search, Send } from "lucide-react";
import { submitContact } from "@/actions/public";
import { Button } from "@/components/ui/button";
import {
  publicFieldClass,
  publicHintClass,
  publicLabelClass,
  publicTextareaClass
} from "@/lib/public-ui";
import { cn } from "@/lib/utils";

const empty = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const t = useTranslations("forms.contact");
  const formsCommon = useTranslations("forms");
  const errors = useTranslations("forms.errors");
  const [pending, start] = useTransition();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    start(async () => {
      const result = await submitContact(form);
      if (result.success) {
        toast.success(t("success"));
        setForm(empty);
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
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={publicLabelClass}>
            {t("name")} {required}
          </label>
          <input
            id="contact-name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className={cn(publicFieldClass, "mt-2")}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={publicLabelClass}>
            {t("email")} {required}
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className={cn(publicFieldClass, "mt-2")}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={publicLabelClass}>
            {t("phone")}
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
            className={cn(publicFieldClass, "mt-2")}
          />
          <p className={cn(publicHintClass, "mt-1.5")}>
            {formsCommon("optional")}
          </p>
        </div>
        <div>
          <label htmlFor="contact-subject" className={publicLabelClass}>
            {t("subject")} {required}
          </label>
          <input
            id="contact-subject"
            required
            value={form.subject}
            onChange={(event) =>
              setForm({ ...form, subject: event.target.value })
            }
            className={cn(publicFieldClass, "mt-2")}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={publicLabelClass}>
          {t("message")} {required}
        </label>
        <textarea
          id="contact-message"
          required
          minLength={10}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className={cn(publicTextareaClass, "mt-2")}
        />
        <p className={cn(publicHintClass, "mt-1.5")}>{t("messageHint")}</p>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-btn border border-error/30 bg-error/5 px-4 py-3 text-small text-error"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" variant="ink" className="mt-6" disabled={pending}>
        <Send className="h-4 w-4" aria-hidden="true" />
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

export function StaffSearch({
  people
}: {
  people: Array<{
    name: string;
    role: string;
    department: string;
    email: string;
  }>;
}) {
  const t = useTranslations("contact.directory");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return people;
    return people.filter(
      (person) =>
        person.name.toLowerCase().includes(q) ||
        person.department.toLowerCase().includes(q) ||
        person.role.toLowerCase().includes(q)
    );
  }, [people, query]);

  return (
    <div>
      <div className="relative max-w-md">
        <label htmlFor="staff-search" className="sr-only">
          {t("searchLabel")}
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          aria-hidden="true"
        />
        <input
          id="staff-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className={cn(publicFieldClass, "pl-9")}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-small">
            <caption className="sr-only">{t("caption")}</caption>
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">
                  {t("office")}
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  {t("department")}
                </th>
                <th scope="col" className="px-5 py-3 font-semibold">
                  {t("email")}
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((person, index) => (
                <tr
                  key={person.email}
                  className={cn(
                    "border-t border-line",
                    index % 2 === 1 && "bg-ivory"
                  )}
                >
                  <th scope="row" className="px-5 py-4 text-left">
                    <span className="block font-medium text-primary">
                      {person.name}
                    </span>
                    <span className="mt-0.5 block text-caption tracking-normal text-ink-faint">
                      {person.role}
                    </span>
                  </th>
                  <td className="px-5 py-4 text-ink-muted">
                    {person.department}
                  </td>
                  <td className="px-5 py-4">
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-2 text-secondary hover:text-primary"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      {person.email}
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr className="border-t border-line">
                  <td
                    colSpan={3}
                    className="px-5 py-10 text-center text-ink-muted"
                  >
                    {t("empty")}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      <p className={cn(publicHintClass, "mt-3")}>{t("phoneNote")}</p>
    </div>
  );
}
