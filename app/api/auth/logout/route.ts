import { NextResponse } from "next/server";
import { logout } from "@/actions/auth";
import { apiError } from "@/lib/api";

export async function POST() {
  try {
    return NextResponse.json(await logout());
  } catch (error) {
    return apiError(error);
  }
}
