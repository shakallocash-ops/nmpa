"use server";

import { hash } from "bcryptjs";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { userAdminRoles } from "@/lib/roles";
import { serialize } from "@/lib/serialize";
import { idSchema, userSchema, userUpdateSchema } from "@/lib/validations";
import { audit, parseOrThrow } from "./helpers";

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  department: true,
  phone: true,
  lgaId: true,
  lastLogin: true,
  isActive: true,
  createdAt: true,
  lga: { select: { id: true, name: true } }
} as const;

export async function createUser(data: unknown) {
  const session = await requireSession(userAdminRoles);
  const parsed = parseOrThrow(userSchema, data);
  const created = await prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email,
      passwordHash: await hash(parsed.password, 12),
      role: parsed.role,
      department: parsed.department || null,
      phone: parsed.phone || null,
      lgaId: parsed.lgaId ?? null,
      isActive: parsed.isActive
    },
    select: publicUserSelect
  });

  await audit(session.user.id, "CREATE", "User", created.id, {
    ...created,
    password: "[redacted]"
  });
  return serialize(created);
}

export async function updateUser(id: string, data: unknown) {
  const session = await requireSession(userAdminRoles);
  const userId = parseOrThrow(idSchema, id);
  const parsed = parseOrThrow(userUpdateSchema, data);

  if (userId === session.user.id && parsed.isActive === false) {
    throw new Error("You cannot deactivate your own account.");
  }

  const { password, ...rest } = parsed;
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: rest.name,
      email: rest.email,
      role: rest.role,
      department: rest.department || null,
      phone: rest.phone || null,
      lgaId: rest.lgaId ?? null,
      isActive: rest.isActive,
      ...(password ? { passwordHash: await hash(password, 12) } : {})
    },
    select: publicUserSelect
  });

  await audit(session.user.id, "UPDATE", "User", userId, {
    ...rest,
    passwordChanged: Boolean(password)
  });
  return serialize(updated);
}
