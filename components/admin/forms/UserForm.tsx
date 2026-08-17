"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";
import { createUser, updateUser } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { FieldError } from "@/components/admin/PageHeader";
import { formatRole } from "@/lib/roles";
import { errorMessage } from "@/lib/serialize";

const roles: UserRole[] = [
  "SUPER_ADMIN",
  "COMMISSIONER",
  "PERM_SECRETARY",
  "DIRECTOR",
  "CONTENT_EDITOR",
  "VIEWER",
  "ENUMERATOR"
];

const userFormSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  password: z.string().max(128),
  role: z.enum([
    "SUPER_ADMIN",
    "COMMISSIONER",
    "PERM_SECRETARY",
    "DIRECTOR",
    "CONTENT_EDITOR",
    "VIEWER",
    "ENUMERATOR"
  ]),
  department: z.string().optional(),
  phone: z.string().optional(),
  lgaId: z.string().optional(),
  isActive: z.boolean()
});

type Values = z.infer<typeof userFormSchema>;

export type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string | null;
  phone: string | null;
  lgaId: string | null;
  isActive: boolean;
};

export function UserForm({
  lgas,
  user,
  onSuccess
}: {
  lgas: Array<{ id: string; name: string }>;
  user?: UserRecord;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Values>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? "VIEWER",
      department: user?.department ?? "",
      phone: user?.phone ?? "",
      lgaId: user?.lgaId ?? "",
      isActive: user?.isActive ?? true
    }
  });

  async function onSubmit(values: Values) {
    if (!user && values.password.length < 12) {
      toast.error("Password must be at least 12 characters.");
      return;
    }
    if (user && values.password && values.password.length < 12) {
      toast.error("Password must be at least 12 characters.");
      return;
    }

    const toastId = toast.loading("Saving...");
    try {
      const payload = {
        name: values.name,
        email: values.email,
        role: values.role,
        department: values.department || null,
        phone: values.phone || "",
        lgaId: values.lgaId || null,
        isActive: values.isActive,
        password: values.password || undefined
      };
      if (user) {
        await updateUser(user.id, payload);
      } else {
        await createUser({ ...payload, password: values.password });
      }
      toast.success("User saved successfully!", { id: toastId });
      onSuccess();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to save. Please check your inputs."), {
        id: toastId
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor="password">
          Password {user ? "(leave blank to keep current)" : ""}
        </Label>
        <Input id="password" type="password" {...register("password")} />
        <FieldError message={errors.password?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <NativeSelect id="role" {...register("role")}>
          {roles.map((role) => (
            <option key={role} value={role}>
              {formatRole(role)}
            </option>
          ))}
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Input id="department" {...register("department")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lgaId">Assigned LGA</Label>
        <NativeSelect id="lgaId" {...register("lgaId")}>
          <option value="">None</option>
          {lgas.map((lga) => (
            <option key={lga.id} value={lga.id}>
              {lga.name}
            </option>
          ))}
        </NativeSelect>
      </div>
      <label className="flex items-center gap-2 text-sm text-white/80 sm:col-span-2">
        <input type="checkbox" {...register("isActive")} />
        Active account
      </label>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Saving..." : "Save user"}
        </Button>
      </div>
    </form>
  );
}
