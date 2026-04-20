"use server";

import { prisma } from "@/lib/prisma";

export async function createDesignation(formData: FormData) {
  await prisma.designation.create({
    data: {
      title: formData.get("title") as string,
    },
  });
}

export async function updateDesignation(id: string, formData: FormData) {
  await prisma.designation.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
    },
  });
}

export async function deleteDesignation(id: string) {
  const employees = await prisma.employee.findMany({
    where: { designationId: id },
  });

  if (employees.length > 0) {
    throw new Error("Cannot delete designation with employees");
  }

  await prisma.designation.delete({
    where: { id },
  });
}
