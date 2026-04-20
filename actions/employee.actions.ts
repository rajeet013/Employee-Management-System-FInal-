"use server";

"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createEmployee(formData: FormData) {
  await prisma.employee.create({
    data: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      departmentId: formData.get("departmentId") as string,
      designationId: formData.get("designationId") as string,
    },
  });

  // optional but recommended
  redirect("/dashboard/employees");
}

export async function deleteEmployee(id: string) {
  return prisma.employee.delete({
    where: { id },
  });

  redirect("/dashboard/employees");
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

  redirect("/dashboard/employees");
}
