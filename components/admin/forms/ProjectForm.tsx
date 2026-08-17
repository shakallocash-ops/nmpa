"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProjectStatus, ProjectType } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";
import { createProject, updateProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/admin/PageHeader";
import { projectTypeLabels } from "@/lib/labels";
import { errorMessage } from "@/lib/serialize";

const projectFormSchema = z.object({
  title: z.string().trim().min(1).max(250),
  description: z.string().trim().min(1).max(10_000),
  lgaId: z.string().min(1, "Select an LGA"),
  type: z.enum([
    "SOLAR_BOREHOLE",
    "SCHOOL_RENOVATION",
    "PEACE_RALLY",
    "DAIRY_CENTER",
    "RANCH"
  ]),
  budget: z.string().optional(),
  status: z.enum(["PLANNING", "ONGOING", "COMPLETED"]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  impactReport: z.string().optional()
});

type Values = z.infer<typeof projectFormSchema>;

export type ProjectRecord = {
  id: string;
  title: string;
  description: string;
  lgaId: string;
  type: ProjectType;
  budget: number | string | null;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
  impactReport: string | null;
};

function toDateInput(value: string | null | undefined) {
  if (!value) return "";
  return value.slice(0, 10);
}

export function ProjectForm({
  lgas,
  project,
  onSuccess
}: {
  lgas: Array<{ id: string; name: string }>;
  project?: ProjectRecord;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Values>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      lgaId: project?.lgaId ?? "",
      type: project?.type ?? "SOLAR_BOREHOLE",
      budget: project?.budget == null ? "" : String(project.budget),
      status: project?.status ?? "PLANNING",
      startDate: toDateInput(project?.startDate),
      endDate: toDateInput(project?.endDate),
      impactReport: project?.impactReport ?? ""
    }
  });

  async function onSubmit(values: Values) {
    const toastId = toast.loading("Saving...");
    try {
      const payload = {
        title: values.title,
        description: values.description,
        lgaId: values.lgaId,
        type: values.type,
        budget: values.budget ? Number(values.budget) : null,
        status: values.status,
        startDate: values.startDate || null,
        endDate: values.endDate || null,
        impactReport: values.impactReport || null
      };
      if (project) {
        await updateProject(project.id, payload);
      } else {
        await createProject(payload);
      }
      toast.success("Project saved successfully!", { id: toastId });
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
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        <FieldError message={errors.title?.message} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        <FieldError message={errors.description?.message} />
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
        <Label htmlFor="type">Type</Label>
        <NativeSelect id="type" {...register("type")}>
          {(Object.keys(projectTypeLabels) as ProjectType[]).map((type) => (
            <option key={type} value={type}>
              {projectTypeLabels[type]}
            </option>
          ))}
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <NativeSelect id="status" {...register("status")}>
          <option value="PLANNING">Planning</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Budget (NGN)</Label>
        <Input id="budget" type="number" min={0} {...register("budget")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="startDate">Start date</Label>
        <Input id="startDate" type="date" {...register("startDate")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">End date</Label>
        <Input id="endDate" type="date" {...register("endDate")} />
        <FieldError message={errors.endDate?.message} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="impactReport">Impact report</Label>
        <Textarea id="impactReport" {...register("impactReport")} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : "Save project"}
        </Button>
      </div>
    </form>
  );
}
