import { NextRequest, NextResponse } from "next/server";
import { createSchool } from "@/actions";
import { apiError } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(await createSchool(await request.json()), {
      status: 201
    });
  } catch (error) {
    return apiError(error);
  }
}
