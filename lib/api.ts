import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function apiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validation failed", issues: error.flatten() },
      { status: 400 }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A record with those unique values already exists" },
        { status: 409 }
      );
    }
  }

  if (error instanceof Error && error.message === "FORBIDDEN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  console.error(error);
  return NextResponse.json(
    { error: "An unexpected server error occurred" },
    { status: 500 }
  );
}
