import { NextRequest, NextResponse } from "next/server";
import { deleteHousehold, updateHousehold } from "@/actions";
import { apiError } from "@/lib/api";

interface RouteContext {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    return NextResponse.json(
      await updateHousehold(params.id, await request.json())
    );
  } catch (error) {
    return apiError(error);
  }
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  try {
    return NextResponse.json(await deleteHousehold(params.id));
  } catch (error) {
    return apiError(error);
  }
}
