"use client";

import { FileDown, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { downloadCsv, downloadPdf } from "@/lib/export";

export function ExportButtons({
  filename,
  title,
  headers,
  rows
}: {
  filename: string;
  title: string;
  headers: string[];
  rows: Array<Array<string | number | null | undefined>>;
}) {
  function handleCsv() {
    downloadCsv(filename, headers, rows);
    toast.success("CSV exported.");
  }

  async function handlePdf() {
    const id = toast.loading("Preparing PDF...");
    try {
      await downloadPdf(
        filename,
        title,
        headers,
        rows.map((row) => row.map((cell) => (cell == null ? "" : String(cell))))
      );
      toast.success("PDF exported.", { id });
    } catch {
      toast.error("Failed to export PDF.", { id });
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" onClick={handleCsv}>
        <FileSpreadsheet className="h-4 w-4" />
        Export CSV
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={handlePdf}>
        <FileDown className="h-4 w-4" />
        Export PDF
      </Button>
    </div>
  );
}
