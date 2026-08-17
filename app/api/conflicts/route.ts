import { NextRequest, NextResponse } from "next/server";
import { createConflictCase } from "@/actions";
import { apiError } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      await createConflictCase(await request.json()),
      { status: 201 }
    );
  } catch (error) {
    return apiError(error);
  }
}
