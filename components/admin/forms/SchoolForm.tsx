"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SchoolStatus } from "@prisma/client";
import { toast } from "sonner";
import { createSchool, updateSchool } from "@/actions/schools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { FieldError } from "@/components/admin/PageHeader";
import { errorMessage } from "@/lib/serialize";
import { nomadicSchoolSchema } from "@/lib/validations";
import type { z } from "zod";

type Values = z.input<typeof nomadicSchoolSchema>;

export type SchoolRecord = {
  id: string;
  name: string;
  lgaId: string;
  location: string;
  status: SchoolStatus;
  teacherCountMale: number;
  teacherCountFemale: number;
  studentEnrollmentMale: number;
  studentEnrollmentFemale: number;
  classroomGood: number;
  classroomBad: number;
  hasSolar: boolean;
  hasBorehole: boolean;
};

export function SchoolForm({
  lgas,
  school,
  onSuccess
}: {
  lgas: Array<{ id: string; name: string }>;
  school?: SchoolRecord;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Values>({
    resolver: zodResolver(nomadicSchoolSchema),
    defaultValues: {
      name: school?.name ?? "",
      lgaId: school?.lgaId ?? "",
      location: school?.location ?? "",
      status: school?.status ?? "NOT_ASSESSED",
      teacherCountMale: school?.teacherCountMale ?? 0,
      teacherCountFemale: school?.teacherCountFemale ?? 0,
      studentEnrollmentMale: school?.studentEnrollmentMale ?? 0,
      studentEnrollmentFemale: school?.studentEnrollmentFemale ?? 0,
      classroomGood: school?.classroomGood ?? 0,
      classroomBad: school?.classroomBad ?? 0,
      hasSolar: school?.hasSolar ?? false,
      hasBorehole: school?.hasBorehole ?? false
    }
  });

  async function onSubmit(values: Values) {
    const toastId = toast.loading("Saving...");
    try {
      if (school) {
        await updateSchool(school.id, values);
      } else {
        await createSchool(values);
      }
      toast.success("School saved successfully!", { id: toastId });
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
        <Label htmlFor="name">School name</Label>
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
        <Label htmlFor="status">Status</Label>
        <NativeSelect id="status" {...register("status")}>
          <option value="VIABLE">Viable</option>
          <option value="NON_VIABLE">Non-Viable</option>
          <option value="NOT_ASSESSED">Not assessed</option>
        </NativeSelect>
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...register("location")} />
        <FieldError message={errors.location?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="teacherCountMale">Teachers (male)</Label>
        <Input id="teacherCountMale" type="number" min={0} {...register("teacherCountMale")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="teacherCountFemale">Teachers (female)</Label>
        <Input
          id="teacherCountFemale"
          type="number"
          min={0}
          {...register("teacherCountFemale")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="studentEnrollmentMale">Enrolment (male)</Label>
        <Input
          id="studentEnrollmentMale"
          type="number"
          min={0}
          {...register("studentEnrollmentMale")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="studentEnrollmentFemale">Enrolment (female)</Label>
        <Input
          id="studentEnrollmentFemale"
          type="number"
          min={0}
          {...register("studentEnrollmentFemale")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="classroomGood">Classrooms (good)</Label>
        <Input id="classroomGood" type="number" min={0} {...register("classroomGood")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="classroomBad">Classrooms (bad)</Label>
        <Input id="classroomBad" type="number" min={0} {...register("classroomBad")} />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/80">
        <input type="checkbox" {...register("hasSolar")} />
        Has solar
      </label>
      <label className="flex items-center gap-2 text-sm text-white/80">
        <input type="checkbox" {...register("hasBorehole")} />
        Has borehole
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : "Save school"}
        </Button>
      </div>
    </form>
  );
}
