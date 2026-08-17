"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import type { ConflictStatus } from "@prisma/client";
import { PageHeader } from "@/components/admin/PageHeader";
import { ResolveConflictForm } from "@/components/admin/forms/ResolveConflictForm";
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
import { conflictStatusLabels, formatDate, formatMoney } from "@/lib/labels";

export type ConflictRow = {
  id: string;
  title: string;
  description: string;
  lgaId: string;
  location: string;
  dateReported: string;
  status: ConflictStatus;
  resolutionDetails: string | null;
  compensationAmount: number | string | null;
  partiesInvolved: unknown;
  lga: { id: string; name: string };
};

function statusBadge(status: ConflictStatus) {
  const map = {
    PENDING: "orange",
    IN_MEDIATION: "warning",
    RESOLVED: "success",
    ESCALATED: "danger"
  } as const;
  return <Badge variant={map[status]}>{conflictStatusLabels[status]}</Badge>;
}

export function ConflictsTable({
  data,
  lgas,
  canResolve
}: {
  data: ConflictRow[];
  lgas: Array<{ id: string; name: string }>;
  canResolve: boolean;
}) {
  const router = useRouter();
  const [lgaId, setLgaId] = useState("");
  const [status, setStatus] = useState("");
  const [viewer, setViewer] = useState<ConflictRow | null>(null);
  const [resolver, setResolver] = useState<ConflictRow | null>(null);

  const filtered = useMemo(
    () =>
      data.filter((row) => {
        if (lgaId && row.lgaId !== lgaId) return false;
        if (status && row.status !== status) return false;
        return true;
      }),
    [data, lgaId, status]
  );

  const columns = useMemo<ColumnDef<ConflictRow>[]>(
    () => [
      { accessorKey: "title", header: sortableHeader("Title") },
      {
        accessorFn: (row) => row.lga.name,
        id: "lga",
        header: sortableHeader("LGA")
      },
      {
        accessorKey: "dateReported",
        header: sortableHeader("Date Reported"),
        cell: ({ row }) => formatDate(row.original.dateReported)
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => statusBadge(row.original.status)
      },
      {
        accessorKey: "resolutionDetails",
        header: "Resolution",
        cell: ({ row }) => row.original.resolutionDetails || "—"
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setViewer(row.original)}>
              View
            </Button>
            {canResolve && row.original.status !== "RESOLVED" ? (
              <Button size="sm" onClick={() => setResolver(row.original)}>
                Resolve
              </Button>
            ) : null}
          </div>
        )
      }
    ],
    [canResolve]
  );

  return (
    <div>
      <PageHeader
        title="Conflict Cases"
        description="Farmer-herder and pastoral conflict tracking, mediation, and compensation."
      />
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search title or location..."
        searchAccessor={(row) => `${row.title} ${row.location} ${row.description}`}
        exportFilename="conflict-cases"
        exportTitle="Conflict Cases"
        exportHeaders={["Title", "LGA", "Date Reported", "Status", "Resolution"]}
        exportRow={(row) => [
          row.title,
          row.lga.name,
          formatDate(row.dateReported),
          conflictStatusLabels[row.status],
          row.resolutionDetails
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
              <option value="PENDING">Pending</option>
              <option value="IN_MEDIATION">In mediation</option>
              <option value="RESOLVED">Resolved</option>
              <option value="ESCALATED">Escalated</option>
            </NativeSelect>
          </>
        }
      />

      <Dialog open={Boolean(viewer)} onOpenChange={(open) => !open && setViewer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewer?.title}</DialogTitle>
          </DialogHeader>
          {viewer ? (
            <div className="space-y-3 text-sm">
              <p className="text-white/70">{viewer.description}</p>
              <p>LGA: {viewer.lga.name}</p>
              <p>Location: {viewer.location}</p>
              <p>Reported: {formatDate(viewer.dateReported)}</p>
              <p>Status: {conflictStatusLabels[viewer.status]}</p>
              <p>Compensation: {formatMoney(viewer.compensationAmount)}</p>
              <p>Resolution: {viewer.resolutionDetails || "Not yet recorded"}</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(resolver)} onOpenChange={(open) => !open && setResolver(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve conflict case</DialogTitle>
          </DialogHeader>
          {resolver ? (
            <ResolveConflictForm
              conflictId={resolver.id}
              defaultCompensation={
                resolver.compensationAmount == null
                  ? null
                  : Number(resolver.compensationAmount)
              }
              onSuccess={() => {
                setResolver(null);
                router.refresh();
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
