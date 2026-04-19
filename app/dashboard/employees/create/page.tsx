import { createEmployee } from "@/actions/employee.actions";
import { prisma } from "@/lib/prisma";

export default async function CreateEmployeePage() {
  const departments = await prisma.department.findMany();
  const designations = await prisma.designation.findMany();

  return (
    <div>
      <h1>Create Employee</h1>

      <form
        action={createEmployee}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: 300,
        }}
      >
        {/* Name */}
        <input name="name" placeholder="Name" required />

        {/* Email */}
        <input name="email" placeholder="Email" required />

        {/* Department Dropdown */}
        <select name="departmentId" required>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Designation Dropdown */}
        <select name="designationId" required>
          <option value="">Select Designation</option>
          {designations.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title}
            </option>
          ))}
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
