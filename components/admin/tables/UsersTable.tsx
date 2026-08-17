"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { updateUser } from "@/actions/users";
import { PageHeader } from "@/components/admin/PageHeader";
import { UserForm, type UserRecord } from "@/components/admin/forms/UserForm";
import { DataTable, sortableHeader } from "@/components/admin/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/labels";
import { formatRole } from "@/lib/roles";
import { errorMessage } from "@/lib/serialize";

export type UserRow = UserRecord & {
  lastLogin: string | null;
  lga: { id: string; name: string } | null;
};

export function UsersTable({
  data,
  lgas,
  currentUserId
}: {
  data: UserRow[];
  lgas: Array<{ id: string; name: string }>;
  currentUserId: string;
}) {
  const router = useRouter();
  const [editor, setEditor] = useState<UserRow | "new" | null>(null);

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      { accessorKey: "name", header: sortableHeader("Name") },
      { accessorKey: "email", header: sortableHeader("Email") },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => formatRole(row.original.role)
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => row.original.department || "—"
      },
      {
        accessorKey: "lastLogin",
        header: sortableHeader("Last Login"),
        cell: ({ row }) => formatDateTime(row.original.lastLogin)
      },
      {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) =>
          row.original.isActive ? (
            <Badge variant="success">Active</Badge>
          ) : (
            <Badge variant="muted">Inactive</Badge>
          )
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setEditor(row.original)}>
              Edit
            </Button>
            <Button
              size="sm"
              variant={row.original.isActive ? "destructive" : "outline"}
              disabled={row.original.id === currentUserId}
              onClick={async () => {
                const toastId = toast.loading("Saving...");
                try {
                  await updateUser(row.original.id, {
                    isActive: !row.original.isActive
                  });
                  toast.success(
                    row.original.isActive ? "User deactivated." : "User activated.",
                    { id: toastId }
                  );
                  router.refresh();
                } catch (error) {
                  toast.error(errorMessage(error, "Failed to update user."), {
                    id: toastId
                  });
                }
              }}
            >
              {row.original.isActive ? "Deactivate" : "Activate"}
            </Button>
          </div>
        )
      }
    ],
    [currentUserId, router]
  );

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Create accounts, assign roles, and control access to the admin portal."
        actions={<Button onClick={() => setEditor("new")}>Add user</Button>}
      />
      <DataTable
        columns={columns}
        data={data}
        searchPlaceholder="Search name or email..."
        searchAccessor={(row) => `${row.name} ${row.email} ${row.role}`}
        exportFilename="users"
        exportTitle="Admin Users"
        exportHeaders={["Name", "Email", "Role", "Department", "Last Login", "Status"]}
        exportRow={(row) => [
          row.name,
          row.email,
          formatRole(row.role),
          row.department,
          formatDateTime(row.lastLogin),
          row.isActive ? "Active" : "Inactive"
        ]}
      />
      <Dialog open={Boolean(editor)} onOpenChange={(open) => !open && setEditor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editor === "new" ? "Add user" : "Edit user"}</DialogTitle>
          </DialogHeader>
          {editor ? (
            <UserForm
              lgas={lgas}
              user={editor === "new" ? undefined : editor}
              onSuccess={() => {
                setEditor(null);
                router.refresh();
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
