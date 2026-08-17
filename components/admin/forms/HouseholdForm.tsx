"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LivestockType } from "@prisma/client";
import { toast } from "sonner";
import { createHousehold, updateHousehold } from "@/actions/households";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { FieldError } from "@/components/admin/PageHeader";
import { errorMessage } from "@/lib/serialize";
import { householdFormSchema } from "@/lib/validations";
import type { z } from "zod";

type Values = z.input<typeof householdFormSchema>;

export type HouseholdRecord = {
  id: string;
  enumeratorId?: string;
  lgaId: string;
  ward: string;
  communityName: string;
  headName: string;
  headAge: number;
  headGender: "MALE" | "FEMALE";
  phone: string | null;
  nin: string | null;
  gpsCoordinates: string;
  settlementType: "NOMADIC" | "SEMI_NOMADIC" | "SETTLED";
  interviewStatus:
    | "COMPLETED"
    | "NO_HOUSEHOLD_MEMBER_HOME"
    | "POSTPONED"
    | "EXTENDED_ABSENCE"
    | "REFUSED"
    | "DWELLING_NOT_FOUND"
    | "DWELLING_DESTROYED"
    | "OTHER";
  livestock: Array<{ type: LivestockType; count: number }>;
};

function livestockCount(record: HouseholdRecord | undefined, type: LivestockType) {
  return record?.livestock.find((item) => item.type === type)?.count ?? 0;
}

function toPayload(values: Values, enumeratorId: string, existingEnumeratorId?: string) {
  const livestock = (
    [
      ["CATTLE", values.cattle],
      ["SHEEP", values.sheep],
      ["GOAT", values.goat],
      ["CAMEL", values.camel],
      ["CHICKEN", values.chicken],
      ["OTHER", values.other]
    ] as const
  )
    .filter(([, count]) => Number(count) > 0)
    .map(([type, count]) => ({ type, count: Number(count) }));

  return {
    lgaId: values.lgaId,
    ward: values.ward,
    communityName: values.communityName,
    headName: values.headName,
    headAge: Number(values.headAge),
    headGender: values.headGender,
    phone: values.phone || "",
    nin: values.nin || "",
    gpsCoordinates: values.gpsCoordinates,
    settlementType: values.settlementType,
    interviewStatus: values.interviewStatus,
    enumeratorId: existingEnumeratorId ?? enumeratorId,
    livestock
  };
}

export function HouseholdForm({
  lgas,
  household,
  currentUserId,
  onSuccess
}: {
  lgas: Array<{ id: string; name: string }>;
  household?: HouseholdRecord;
  currentUserId: string;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Values>({
    resolver: zodResolver(householdFormSchema),
    defaultValues: {
      lgaId: household?.lgaId ?? "",
      ward: household?.ward ?? "",
      communityName: household?.communityName ?? "",
      headName: household?.headName ?? "",
      headAge: household?.headAge ?? 18,
      headGender: household?.headGender ?? "MALE",
      phone: household?.phone ?? "",
      nin: household?.nin ?? "",
      gpsCoordinates: household?.gpsCoordinates ?? "",
      settlementType: household?.settlementType ?? "NOMADIC",
      interviewStatus: household?.interviewStatus ?? "COMPLETED",
      cattle: livestockCount(household, "CATTLE"),
      sheep: livestockCount(household, "SHEEP"),
      goat: livestockCount(household, "GOAT"),
      camel: livestockCount(household, "CAMEL"),
      chicken: livestockCount(household, "CHICKEN"),
      other: livestockCount(household, "OTHER")
    }
  });

  async function onSubmit(values: Values) {
    const toastId = toast.loading("Saving...");
    try {
      const payload = toPayload(values, currentUserId, household?.enumeratorId);
      if (household) {
        await updateHousehold(household.id, payload);
      } else {
        await createHousehold(payload);
      }
      toast.success("Household saved successfully!", { id: toastId });
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
        <Label htmlFor="headName">Head name</Label>
        <Input id="headName" {...register("headName")} />
        <FieldError message={errors.headName?.message} />
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
        <Label htmlFor="ward">Ward</Label>
        <Input id="ward" {...register("ward")} />
        <FieldError message={errors.ward?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="communityName">Community</Label>
        <Input id="communityName" {...register("communityName")} />
        <FieldError message={errors.communityName?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="headAge">Age</Label>
        <Input id="headAge" type="number" {...register("headAge")} />
        <FieldError message={errors.headAge?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="headGender">Gender</Label>
        <NativeSelect id="headGender" {...register("headGender")}>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" placeholder="08012345678" {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="nin">NIN</Label>
        <Input id="nin" placeholder="11-digit NIN" {...register("nin")} />
        <FieldError message={errors.nin?.message} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="gpsCoordinates">GPS (latitude, longitude)</Label>
        <Input
          id="gpsCoordinates"
          placeholder="9.6000, 6.5500"
          {...register("gpsCoordinates")}
        />
        <FieldError message={errors.gpsCoordinates?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="settlementType">Settlement type</Label>
        <NativeSelect id="settlementType" {...register("settlementType")}>
          <option value="NOMADIC">Nomadic</option>
          <option value="SEMI_NOMADIC">Semi-nomadic</option>
          <option value="SETTLED">Settled</option>
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="interviewStatus">Interview status</Label>
        <NativeSelect id="interviewStatus" {...register("interviewStatus")}>
          <option value="COMPLETED">Completed</option>
          <option value="NO_HOUSEHOLD_MEMBER_HOME">No member home</option>
          <option value="POSTPONED">Postponed</option>
          <option value="EXTENDED_ABSENCE">Extended absence</option>
          <option value="REFUSED">Refused</option>
          <option value="DWELLING_NOT_FOUND">Dwelling not found</option>
          <option value="DWELLING_DESTROYED">Dwelling destroyed</option>
          <option value="OTHER">Other</option>
        </NativeSelect>
      </div>
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-white/80">Livestock counts</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {(["cattle", "sheep", "goat", "camel", "chicken", "other"] as const).map(
            (field) => (
              <div key={field} className="space-y-1">
                <Label htmlFor={field} className="capitalize">
                  {field}
                </Label>
                <Input id={field} type="number" min={0} {...register(field)} />
              </div>
            )
          )}
        </div>
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : "Save household"}
        </Button>
      </div>
    </form>
  );
}
