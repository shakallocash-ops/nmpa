export function escapeCsvValue(value: string | number | null | undefined) {
  const text = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function downloadCsv(
  filename: string,
  headers: string[],
  rows: Array<Array<string | number | null | undefined>>
) {
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function downloadPdf(
  filename: string,
  title: string,
  headers: string[],
  rows: string[][]
) {
  const [{ pdf }, { BrandedPdfDocument }, { createElement }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/admin/pdf/BrandedPdf"),
    import("react")
  ]);
  const blob = await pdf(
    createElement(BrandedPdfDocument, { title, headers, rows })
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}
