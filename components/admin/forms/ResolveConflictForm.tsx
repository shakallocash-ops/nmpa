"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resolveConflictCase } from "@/actions/conflicts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/admin/PageHeader";
import { errorMessage } from "@/lib/serialize";
import { resolveConflictSchema } from "@/lib/validations";
import type { z } from "zod";

type Values = z.input<typeof resolveConflictSchema>;

export function ResolveConflictForm({
  conflictId,
  defaultCompensation,
  onSuccess
}: {
  conflictId: string;
  defaultCompensation?: number | null;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Values>({
    resolver: zodResolver(resolveConflictSchema),
    defaultValues: {
      resolutionDetails: "",
      compensationAmount: defaultCompensation ?? undefined,
      status: "RESOLVED"
    }
  });

  async function onSubmit(values: Values) {
    const toastId = toast.loading("Saving...");
    try {
      await resolveConflictCase(conflictId, {
        ...values,
        compensationAmount:
          values.compensationAmount === undefined || values.compensationAmount === null
            ? null
            : Number(values.compensationAmount)
      });
      toast.success("Conflict case resolved successfully!", { id: toastId });
      onSuccess();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to save. Please check your inputs."), {
        id: toastId
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="resolutionDetails">Resolution details</Label>
        <Textarea id="resolutionDetails" {...register("resolutionDetails")} />
        <FieldError message={errors.resolutionDetails?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="compensationAmount">Compensation amount (NGN)</Label>
        <Input
          id="compensationAmount"
          type="number"
          min={0}
          step="0.01"
          {...register("compensationAmount")}
        />
        <FieldError message={errors.compensationAmount?.message} />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : "Resolve case"}
      </Button>
    </form>
  );
}
