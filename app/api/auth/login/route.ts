import { NextRequest, NextResponse } from "next/server";
import { login } from "@/actions/auth";
import { apiError } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const result = await login(email, password);
    if (!result.success) {
      const status = result.error === "Invalid credentials" ? 401 : 503;
      return NextResponse.json({ error: result.error }, { status });
    }
    return NextResponse.json(result);
  } catch (error) {
    return apiError(error);
  }
}
