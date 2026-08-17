"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import type { ProjectStatus } from "@prisma/client";
import { toast } from "sonner";
import { deleteProject } from "@/actions/projects";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProjectForm, type ProjectRecord } from "@/components/admin/forms/ProjectForm";
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
  projectProgress,
  projectStatusLabels,
  projectTypeLabels
} from "@/lib/labels";
import { errorMessage } from "@/lib/serialize";

export type ProjectRow = ProjectRecord & {
  lga: { id: string; name: string };
};

function statusBadge(status: ProjectStatus) {
  if (status === "COMPLETED") return <Badge variant="success">Completed</Badge>;
  if (status === "ONGOING") return <Badge variant="warning">Ongoing</Badge>;
  return <Badge variant="muted">Planning</Badge>;
}

export function ProjectsTable({
  data,
  lgas,
  canWrite,
  canDelete
}: {
  data: ProjectRow[];
  lgas: Array<{ id: string; name: string }>;
  canWrite: boolean;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [lgaId, setLgaId] = useState("");
  const [editor, setEditor] = useState<ProjectRow | "new" | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ProjectRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(
    () => (lgaId ? data.filter((row) => row.lgaId === lgaId) : data),
    [data, lgaId]
  );

  const columns = useMemo<ColumnDef<ProjectRow>[]>(
    () => [
      { accessorKey: "title", header: sortableHeader("Title") },
      {
        accessorFn: (row) => row.lga.name,
        id: "lga",
        header: sortableHeader("LGA")
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => projectTypeLabels[row.original.type]
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => statusBadge(row.original.status)
      },
      {
        id: "progress",
        header: "Progress",
        cell: ({ row }) => {
          const value = projectProgress(
            row.original.status,
            row.original.startDate,
            row.original.endDate
          );
          return (
            <div className="min-w-[140px]">
              <div className="mb-1 text-xs text-white/60">{value}%</div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gold"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        }
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
      await deleteProject(pendingDelete.id);
      toast.success("Project deleted.", { id: toastId });
      setPendingDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to delete project."), { id: toastId });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Solar boreholes, school renovations, ranches, and pastoral development works."
        actions={
          canWrite ? <Button onClick={() => setEditor("new")}>Add project</Button> : null
        }
      />
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search project title..."
        searchAccessor={(row) => `${row.title} ${row.description}`}
        exportFilename="projects"
        exportTitle="Ministry Projects"
        exportHeaders={["Title", "LGA", "Type", "Status"]}
        exportRow={(row) => [
          row.title,
          row.lga.name,
          projectTypeLabels[row.type],
          projectStatusLabels[row.status]
        ]}
        toolbar={
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
        }
      />
      <Dialog open={Boolean(editor)} onOpenChange={(open) => !open && setEditor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editor === "new" ? "Add project" : "Edit project"}</DialogTitle>
          </DialogHeader>
          {editor ? (
            <ProjectForm
              lgas={lgas}
              project={editor === "new" ? undefined : editor}
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
        title="Delete project"
        description="This will permanently remove the project record."
        onConfirm={confirmDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        pending={deleting}
      />
    </div>
  );
}
