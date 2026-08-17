import { NextRequest, NextResponse } from "next/server";
import { getLGAReport } from "@/actions";
import { apiError } from "@/lib/api";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json(await getLGAReport(params.id));
  } catch (error) {
    return apiError(error);
  }
}
