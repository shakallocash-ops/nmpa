"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return <Label className={className} {...props} />;
}

function FormControl({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { name } = React.useContext(FormFieldContext);
  const {
    formState: { errors }
  } = useFormContext();
  const error = name ? errors[name] : undefined;
  const message = error?.message ? String(error.message) : props.children;
  if (!message) return null;
  return (
    <p className={cn("text-sm text-red-400", className)} {...props}>
      {message}
    </p>
  );
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage };
