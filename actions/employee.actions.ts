"use server";

import { prisma } from "@/lib/prisma";

export async function createEmployee(formData: FormData) {
  return prisma.employee.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      departmentId: formData.get("departmentId") as string,
      designationId: formData.get("designationId") as string,
    },
  });
}

export async function deleteEmployee(id: string) {
  return prisma.employee.delete({
    where: { id },
  });
}

export async function updateEmployee(id: string, formData: FormData) {
  return prisma.employee.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      departmentId: formData.get("departmentId") as string,
      designationId: formData.get("designationId") as string,
    },
  });
}
