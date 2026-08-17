import { NextRequest, NextResponse } from "next/server";
import { resolveConflictCase } from "@/actions";
import { apiError } from "@/lib/api";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json(
      await resolveConflictCase(params.id, await request.json())
    );
  } catch (error) {
    return apiError(error);
  }
}
