"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import type { SchoolStatus } from "@prisma/client";
import { toast } from "sonner";
import { deleteSchool } from "@/actions/schools";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { PageHeader } from "@/components/admin/PageHeader";
import { SchoolForm, type SchoolRecord } from "@/components/admin/forms/SchoolForm";
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
import { schoolStatusLabels } from "@/lib/labels";
import { errorMessage } from "@/lib/serialize";

export type SchoolRow = SchoolRecord & {
  lga: { id: string; name: string };
};

function statusBadge(status: SchoolStatus) {
  if (status === "VIABLE") return <Badge variant="success">Viable</Badge>;
  if (status === "NON_VIABLE") return <Badge variant="danger">Non-Viable</Badge>;
  return <Badge variant="muted">Not assessed</Badge>;
}

export function SchoolsTable({
  data,
  lgas,
  canWrite,
  canDelete
}: {
  data: SchoolRow[];
  lgas: Array<{ id: string; name: string }>;
  canWrite: boolean;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [lgaId, setLgaId] = useState("");
  const [status, setStatus] = useState("");
  const [editor, setEditor] = useState<SchoolRow | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SchoolRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(
    () =>
      data.filter((row) => {
        if (lgaId && row.lgaId !== lgaId) return false;
        if (status && row.status !== status) return false;
        return true;
      }),
    [data, lgaId, status]
  );

  const columns = useMemo<ColumnDef<SchoolRow>[]>(
    () => [
      { accessorKey: "name", header: sortableHeader("School Name") },
      {
        accessorFn: (row) => row.lga.name,
        id: "lga",
        header: sortableHeader("LGA")
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => statusBadge(row.original.status)
      },
      {
        id: "enrolment",
        header: "Enrolment (M/F)",
        cell: ({ row }) =>
          `${row.original.studentEnrollmentMale} / ${row.original.studentEnrollmentFemale}`
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            {canWrite ? (
              <Button size="sm" variant="outline" onClick={() => setEditor(row.original)}>
                Edit
              </Button>
            ) : null}
            {canDelete ? (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setPendingDelete(row.original)}
              >
                Delete
              </Button>
            ) : null}
          </div>
        )
      }
    ],
    [canDelete, canWrite]
  );

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    const toastId = toast.loading("Saving...");
    try {
      await deleteSchool(pendingDelete.id);
      toast.success("School deleted.", { id: toastId });
      setPendingDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to delete school."), { id: toastId });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Nomadic Schools"
        description="Viability, staffing, and enrolment across nomadic education centres."
        actions={
          canWrite ? <Button onClick={() => setEditor("new")}>Add school</Button> : null
        }
      />
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search school name..."
        searchAccessor={(row) => `${row.name} ${row.location}`}
        exportFilename="nomadic-schools"
        exportTitle="Nomadic Schools"
        exportHeaders={["School", "LGA", "Status", "Enrolment Male", "Enrolment Female"]}
        exportRow={(row) => [
          row.name,
          row.lga.name,
          schoolStatusLabels[row.status],
          row.studentEnrollmentMale,
          row.studentEnrollmentFemale
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
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="max-w-xs"
            >
              <option value="">All statuses</option>
              <option value="VIABLE">Viable</option>
              <option value="NON_VIABLE">Non-Viable</option>
              <option value="NOT_ASSESSED">Not assessed</option>
            </NativeSelect>
          </>
        }
      />
      <Dialog open={Boolean(editor)} onOpenChange={(open) => !open && setEditor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editor === "new" ? "Add school" : "Edit school"}</DialogTitle>
          </DialogHeader>
          {editor ? (
            <SchoolForm
              lgas={lgas}
              school={editor === "new" ? undefined : editor}
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
        title="Delete school"
        description="This will permanently remove the school record."
        onConfirm={confirmDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        pending={deleting}
      />
    </div>
  );
}
