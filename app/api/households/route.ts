import { NextRequest, NextResponse } from "next/server";
import { createHousehold } from "@/actions";
import { apiError } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const household = await createHousehold(await request.json());
    return NextResponse.json(household, { status: 201 });
  } catch (error) {
    return apiError(error);
  }
}
