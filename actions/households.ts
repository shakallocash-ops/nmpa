"use server";

import { LivestockType } from "@prisma/client";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  householdWriteRoles,
  leadershipRoles
} from "@/lib/roles";
import { serialize } from "@/lib/serialize";
import {
  householdSchema,
  householdUpdateSchema,
  idSchema
} from "@/lib/validations";
import { audit, parseOrThrow } from "./helpers";

export async function createHousehold(data: unknown) {
  const session = await requireSession(householdWriteRoles);
  const parsed = parseOrThrow(householdSchema, {
    enumeratorId: session.user.id,
    ...(typeof data === "object" && data !== null ? data : {})
  });

  if (
    session.user.role === "ENUMERATOR" &&
    parsed.enumeratorId !== session.user.id
  ) {
    throw new Error("Enumerators can only submit their own records.");
  }

  const { livestock, ...household } = parsed;
  const created = await prisma.household.create({
    data: {
      ...household,
      phone: household.phone || null,
      nin: household.nin || null,
      livestock: livestock ? { create: livestock } : undefined
    },
    include: { livestock: true, lga: true }
  });

  await audit(session.user.id, "CREATE", "Household", created.id, created);
  return serialize(created);
}

export async function updateHousehold(id: string, data: unknown) {
  const session = await requireSession(householdWriteRoles);
  const householdId = parseOrThrow(idSchema, id);
  const parsed = parseOrThrow(householdUpdateSchema, data);
  const current = await prisma.household.findUniqueOrThrow({
    where: { id: householdId }
  });

  if (
    session.user.role === "ENUMERATOR" &&
    current.enumeratorId !== session.user.id
  ) {
    throw new Error("Enumerators can only update their own records.");
  }

  const { livestock, ...household } = parsed;
  const updated = await prisma.$transaction(async (tx) => {
    if (livestock) {
      for (const item of livestock) {
        await tx.livestock.upsert({
          where: {
            householdId_type: {
              householdId,
              type: item.type
            }
          },
          update: { count: item.count },
          create: { ...item, householdId }
        });
      }

      const incomingTypes = livestock.map((item) => item.type);
      await tx.livestock.deleteMany({
        where: {
          householdId,
          type: {
            notIn: incomingTypes as LivestockType[]
          }
        }
      });
    }

    return tx.household.update({
      where: { id: householdId },
      data: {
        ...household,
        phone: household.phone === "" ? null : household.phone,
        nin: household.nin === "" ? null : household.nin
      },
      include: { livestock: true, lga: true }
    });
  });

  await audit(session.user.id, "UPDATE", "Household", householdId, parsed);
  return serialize(updated);
}

export async function deleteHousehold(id: string) {
  const session = await requireSession(leadershipRoles);
  const householdId = parseOrThrow(idSchema, id);
  const deleted = await prisma.household.delete({
    where: { id: householdId }
  });
  await audit(session.user.id, "DELETE", "Household", householdId, deleted);
  return { success: true };
}
