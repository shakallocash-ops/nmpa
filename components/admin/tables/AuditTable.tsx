"use client";

import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable, sortableHeader } from "@/components/admin/tables/DataTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/select";
import { formatDateTime } from "@/lib/labels";

export type AuditRow = {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  changes: unknown;
  createdAt: string;
  user: { id: string; name: string; email: string };
};

export function AuditTable({
  data,
  users
}: {
  data: AuditRow[];
  users: Array<{ id: string; name: string }>;
}) {
  const [userId, setUserId] = useState("");
  const [entityType, setEntityType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const entityTypes = useMemo(
    () => Array.from(new Set(data.map((row) => row.entityType))).sort(),
    [data]
  );

  const filtered = useMemo(
    () =>
      data.filter((row) => {
        if (userId && row.user.id !== userId) return false;
        if (entityType && row.entityType !== entityType) return false;
        const created = new Date(row.createdAt).getTime();
        if (from && created < new Date(from).getTime()) return false;
        if (to && created > new Date(`${to}T23:59:59`).getTime()) return false;
        return true;
      }),
    [data, entityType, from, to, userId]
  );

  const columns = useMemo<ColumnDef<AuditRow>[]>(
    () => [
      {
        accessorFn: (row) => row.user.name,
        id: "user",
        header: sortableHeader("User"),
        cell: ({ row }) => (
          <div>
            <p>{row.original.user.name}</p>
            <p className="text-xs text-white/50">{row.original.user.email}</p>
          </div>
        )
      },
      { accessorKey: "action", header: sortableHeader("Action") },
      { accessorKey: "entityType", header: sortableHeader("Entity Type") },
      {
        id: "changes",
        header: "Changes",
        cell: ({ row }) => (
          <Accordion type="single" collapsible>
            <AccordionItem value={row.original.id}>
              <AccordionTrigger>View JSON</AccordionTrigger>
              <AccordionContent>
                <pre className="max-h-56 overflow-auto rounded-md bg-[#061220] p-3 text-xs text-gold/90">
                  {JSON.stringify(row.original.changes ?? {}, null, 2)}
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      },
      {
        accessorKey: "createdAt",
        header: sortableHeader("Timestamp"),
        cell: ({ row }) => formatDateTime(row.original.createdAt)
      }
    ],
    []
  );

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="Read-only timeline of administrative actions across the ministry portal."
      />
      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search action or entity..."
        searchAccessor={(row) =>
          `${row.user.name} ${row.action} ${row.entityType} ${row.entityId ?? ""}`
        }
        exportFilename="audit-logs"
        exportTitle="Audit Logs"
        exportHeaders={["User", "Action", "Entity Type", "Timestamp"]}
        exportRow={(row) => [
          row.user.name,
          row.action,
          row.entityType,
          formatDateTime(row.createdAt)
        ]}
        toolbar={
          <>
            <NativeSelect
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              className="max-w-xs"
            >
              <option value="">All users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect
              value={entityType}
              onChange={(event) => setEntityType(event.target.value)}
              className="max-w-xs"
            >
              <option value="">All entity types</option>
              {entityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </NativeSelect>
            <Input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="max-w-[160px]"
            />
            <Input
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="max-w-[160px]"
            />
          </>
        }
      />
    </div>
  );
}
