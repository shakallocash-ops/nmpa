"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { deleteCommitteeMember } from "@/actions/committee";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  CommitteeForm,
  type CommitteeRecord
} from "@/components/admin/forms/CommitteeForm";
import { DataTable, sortableHeader } from "@/components/admin/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { NativeSelect } from "@/components/ui/select";
import {
  committeeRoleLabels,
  committeeTypeLabels
} from "@/lib/labels";
import { errorMessage } from "@/lib/serialize";

export type CommitteeRow = CommitteeRecord & {
  lga: { id: string; name: string };
};

export function CommitteeTable({
  data,
  lgas,
  canWrite
}: {
  data: CommitteeRow[];
  lgas: Array<{ id: string; name: string }>;
  canWrite: boolean;
}) {
  const router = useRouter();
  const [lgaId, setLgaId] = useState("");
  const [committeeType, setCommitteeType] = useState("");
  const [editor, setEditor] = useState<CommitteeRow | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<CommitteeRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(
    () =>
      data.filter((row) => {
        if (lgaId && row.lgaId !== lgaId) return false;
        if (committeeType && row.committeeType !== committeeType) return false;
        return true;
      }),
    [committeeType, data, lgaId]
  );

  const columns = useMemo<ColumnDef<CommitteeRow>[]>(
    () => [
      { accessorKey: "name", header: sortableHeader("Name") },
      {
        accessorFn: (row) => row.lga.name,
        id: "lga",
        header: sortableHeader("LGA")
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => committeeRoleLabels[row.original.role]
      },
      {
        accessorKey: "committeeType",
        header: "Committee Type",
        cell: ({ row }) => committeeTypeLabels[row.original.committeeType]
      },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.original.phone || "—"
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
        cell: ({ row }) =>
          canWrite ? (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditor(row.original)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setPendingDelete(row.original)}
              >
                Delete
              </Button>
            </div>
          ) : null
      }
    ],
    [canWrite]
  );

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    const toastId = toast.loading("Saving...");
    try {
      await deleteCommitteeMember(pendingDelete.id);
      toast.success("Committee member deleted.", { id: toastId });
      setPendingDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to delete member."), { id: toastId });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="30-Man Committee"
        description="Traditional leadership and peace committee membership by LGA."
        actions={
          canWrite ? <Button onClick={() => setEditor("new")}>Add member</Button> : null
        }
      />
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search member name..."
        searchAccessor={(row) => `${row.name} ${row.phone ?? ""}`}
        exportFilename="committee-members"
        exportTitle="30-Man and Peace Committees"
        exportHeaders={["Name", "LGA", "Role", "Committee Type", "Phone", "Status"]}
        exportRow={(row) => [
          row.name,
          row.lga.name,
          committeeRoleLabels[row.role],
          committeeTypeLabels[row.committeeType],
          row.phone,
          row.isActive ? "Active" : "Inactive"
        ]}
        toolbar={
          <>
            <NativeSelect
              value={lgaId}
              onChange={(event) => setLgaId(event.target.value)}
              className="max-w-xs"
            >
              <option value="">All LGAs</option>
              {lgas.map((lga) => (
                <option key={lga.id} value={lga.id}>
                  {lga.name}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect
              value={committeeType}
              onChange={(event) => setCommitteeType(event.target.value)}
              className="max-w-xs"
            >
              <option value="">All committee types</option>
              <option value="THIRTY_MAN">30-Man</option>
              <option value="PEACE">Peace</option>
            </NativeSelect>
          </>
        }
      />
      <Dialog open={Boolean(editor)} onOpenChange={(open) => !open && setEditor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editor === "new" ? "Add committee member" : "Edit committee member"}
            </DialogTitle>
          </DialogHeader>
          {editor ? (
            <CommitteeForm
              lgas={lgas}
              member={editor === "new" ? undefined : editor}
              onSuccess={() => {
                setEditor(null);
                router.refresh();
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete committee member"
        description="This will permanently remove the member record."
        onConfirm={confirmDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        pending={deleting}
      />
    </div>
  );
}
