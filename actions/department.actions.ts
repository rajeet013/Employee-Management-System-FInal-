"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createDepartment(formData: FormData) {
  await prisma.department.create({
    data: {
      name: formData.get("name") as string,
    },
  });

  redirect("/dashboard/departments");
}

export async function updateDepartment(id: string, formData: FormData) {
  await prisma.department.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
    },
  });
}

export async function deleteDepartment(id: string) {
  await prisma.department.delete({
    where: { id },
  });
}
