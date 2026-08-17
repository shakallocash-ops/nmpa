import { NextRequest, NextResponse } from "next/server";
import { updateSchool } from "@/actions";
import { apiError } from "@/lib/api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    return NextResponse.json(
      await updateSchool(params.id, await request.json())
    );
  } catch (error) {
    return apiError(error);
  }
}
