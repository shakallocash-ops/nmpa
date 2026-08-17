"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { deleteHousehold } from "@/actions/households";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  HouseholdForm,
  type HouseholdRecord
} from "@/components/admin/forms/HouseholdForm";
import { DataTable, sortableHeader } from "@/components/admin/tables/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { NativeSelect } from "@/components/ui/select";
import { errorMessage } from "@/lib/serialize";

export type HouseholdRow = HouseholdRecord & {
  enumeratorId: string;
  lga: { id: string; name: string };
};

export function HouseholdsTable({
  data,
  lgas,
  currentUserId,
  canWrite,
  canDelete
}: {
  data: HouseholdRow[];
  lgas: Array<{ id: string; name: string }>;
  currentUserId: string;
  canWrite: boolean;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [lgaId, setLgaId] = useState("");
  const [editor, setEditor] = useState<HouseholdRow | "new" | null>(null);
  const [viewer, setViewer] = useState<HouseholdRow | null>(null);
  const [pendingDelete, setPendingDelete] = useState<HouseholdRow | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(
    () => (lgaId ? data.filter((row) => row.lgaId === lgaId) : data),
    [data, lgaId]
  );

  const columns = useMemo<ColumnDef<HouseholdRow>[]>(
    () => [
      {
        accessorKey: "headName",
        header: sortableHeader("Head Name")
      },
      {
        accessorFn: (row) => row.lga.name,
        id: "lga",
        header: sortableHeader("LGA")
      },
      { accessorKey: "ward", header: sortableHeader("Ward") },
      {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.original.phone || "—"
      },
      {
        id: "livestock",
        header: sortableHeader("Livestock"),
        accessorFn: (row) =>
          row.livestock.reduce((sum, item) => sum + item.count, 0),
        cell: ({ getValue }) => Number(getValue() ?? 0).toLocaleString()
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          const canEditThis =
            canWrite &&
            (canDelete || item.enumeratorId === currentUserId);
          return (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => setViewer(item)}>
                View
              </Button>
              {canEditThis ? (
                <Button size="sm" variant="outline" onClick={() => setEditor(item)}>
                  Edit
                </Button>
              ) : null}
              {canDelete ? (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setPendingDelete(item)}
                >
                  Delete
                </Button>
              ) : null}
            </div>
          );
        }
      }
    ],
    [canDelete, canWrite, currentUserId]
  );

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    const toastId = toast.loading("Saving...");
    try {
      await deleteHousehold(pendingDelete.id);
      toast.success("Household deleted.", { id: toastId });
      setPendingDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(errorMessage(error, "Failed to delete household."), { id: toastId });
    } finally {
      setDeleting(false);
    }
  }

  function closeEditor() {
    setEditor(null);
    router.refresh();
  }

  return (
    <div>
      <PageHeader
        title="Pastoralist Database"
        description="Household enumeration records across Niger State LGAs."
        actions={
          canWrite ? (
            <Button onClick={() => setEditor("new")}>Add household</Button>
          ) : null
        }
      />
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search ward or head name..."
        searchAccessor={(row) => `${row.headName} ${row.ward} ${row.communityName}`}
        exportFilename="households"
        exportTitle="Pastoralist Households"
        exportHeaders={["Head Name", "LGA", "Ward", "Phone", "Livestock"]}
        exportRow={(row) => [
          row.headName,
          row.lga.name,
          row.ward,
          row.phone,
          row.livestock.reduce((sum, item) => sum + item.count, 0)
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
            <DialogTitle>
              {editor === "new" ? "Add household" : "Edit household"}
            </DialogTitle>
          </DialogHeader>
          {editor ? (
            <HouseholdForm
              lgas={lgas}
              household={editor === "new" ? undefined : editor}
              currentUserId={currentUserId}
              onSuccess={closeEditor}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewer)} onOpenChange={(open) => !open && setViewer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Household details</DialogTitle>
          </DialogHeader>
          {viewer ? (
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-white/50">Head name</dt>
                <dd>{viewer.headName}</dd>
              </div>
              <div>
                <dt className="text-white/50">LGA</dt>
                <dd>{viewer.lga.name}</dd>
              </div>
              <div>
                <dt className="text-white/50">Ward</dt>
                <dd>{viewer.ward}</dd>
              </div>
              <div>
                <dt className="text-white/50">Community</dt>
                <dd>{viewer.communityName}</dd>
              </div>
              <div>
                <dt className="text-white/50">Phone</dt>
                <dd>{viewer.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-white/50">NIN</dt>
                <dd>{viewer.nin || "—"}</dd>
              </div>
              <div>
                <dt className="text-white/50">GPS</dt>
                <dd>{viewer.gpsCoordinates}</dd>
              </div>
              <div>
                <dt className="text-white/50">Livestock</dt>
                <dd>
                  {viewer.livestock.length
                    ? viewer.livestock
                        .map((item) => `${item.type}: ${item.count}`)
                        .join(", ")
                    : "None recorded"}
                </dd>
              </div>
            </dl>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete household"
        description="This will permanently remove the household and livestock records."
        onConfirm={confirmDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        pending={deleting}
      />
    </div>
  );
}
