import { NextResponse } from "next/server";
import { getSession } from "@/actions/auth";
import { apiError } from "@/lib/api";

// Reads the session cookie, so it can never be prerendered.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json(
      { session },
      { status: session ? 200 : 401 }
    );
  } catch (error) {
    return apiError(error);
  }
}
