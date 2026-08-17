import { NextResponse } from "next/server";
import { getDashboardStats } from "@/actions";
import { apiError } from "@/lib/api";

// Authenticated report data, resolved per request.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getDashboardStats());
  } catch (error) {
    return apiError(error);
  }
}
