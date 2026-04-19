import { updateEmployee } from "@/actions/employee.actions";
import { prisma } from "@/lib/prisma";

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const employee = await prisma.employee.findUnique({
    where: { id },
  });

  const departments = await prisma.department.findMany();
  const designations = await prisma.designation.findMany();

  if (!employee) {
    return <p>Employee not found</p>;
  }

  return (
    <div>
      <h1>Edit Employee</h1>

      <form
        action={async (formData) => {
          "use server";
          await updateEmployee(id, formData);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: 300,
        }}
      >
        {/* Name */}
        <input name="name" defaultValue={employee.name} placeholder="Name" />

        {/* Email */}
        <input name="email" defaultValue={employee.email} placeholder="Email" />

        {/* Department */}
        <select name="departmentId" defaultValue={employee.departmentId}>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Designation */}
        <select name="designationId" defaultValue={employee.designationId}>
          {designations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
