"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CommitteeRole, CommitteeType } from "@prisma/client";
import { toast } from "sonner";
import {
  createCommitteeMember,
  updateCommitteeMember
} from "@/actions/committee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { FieldError } from "@/components/admin/PageHeader";
import { committeeRoleLabels } from "@/lib/labels";
import { errorMessage } from "@/lib/serialize";
import { committeeMemberSchema } from "@/lib/validations";
import type { z } from "zod";

type Values = z.input<typeof committeeMemberSchema>;

export type CommitteeRecord = {
  id: string;
  name: string;
  phone: string | null;
  lgaId: string;
  role: CommitteeRole;
  committeeType: CommitteeType;
  isActive: boolean;
};

export function CommitteeForm({
  lgas,
  member,
  onSuccess
}: {
  lgas: Array<{ id: string; name: string }>;
  member?: CommitteeRecord;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Values>({
    resolver: zodResolver(committeeMemberSchema),
    defaultValues: {
      name: member?.name ?? "",
      phone: member?.phone ?? "",
      lgaId: member?.lgaId ?? "",
      role: member?.role ?? "MEMBER",
      committeeType: member?.committeeType ?? "THIRTY_MAN",
      isActive: member?.isActive ?? true
    }
  });

  async function onSubmit(values: Values) {
    const toastId = toast.loading("Saving...");
    try {
      if (member) {
        await updateCommitteeMember(member.id, values);
      } else {
        await createCommitteeMember(values);
      }
      toast.success("Committee member saved successfully!", { id: toastId });
      onSuccess();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to save. Please check your inputs."), {
        id: toastId
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lgaId">LGA</Label>
        <NativeSelect id="lgaId" {...register("lgaId")}>
          <option value="">Select LGA</option>
          {lgas.map((lga) => (
            <option key={lga.id} value={lga.id}>
              {lga.name}
            </option>
          ))}
        </NativeSelect>
        <FieldError message={errors.lgaId?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <NativeSelect id="role" {...register("role")}>
          {(Object.keys(committeeRoleLabels) as CommitteeRole[]).map((role) => (
            <option key={role} value={role}>
              {committeeRoleLabels[role]}
            </option>
          ))}
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="committeeType">Committee type</Label>
        <NativeSelect id="committeeType" {...register("committeeType")}>
          <option value="THIRTY_MAN">30-Man Committee</option>
          <option value="PEACE">Peace Committee</option>
        </NativeSelect>
      </div>
      <label className="flex items-center gap-2 text-sm text-white/80 sm:col-span-2">
        <input type="checkbox" {...register("isActive")} />
        Active member
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : "Save member"}
        </Button>
      </div>
    </form>
  );
}
