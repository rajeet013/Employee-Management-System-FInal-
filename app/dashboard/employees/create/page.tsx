import { createEmployee } from "@/actions/employee.actions";
import { prisma } from "@/lib/prisma";

export default async function CreateEmployeePage() {
  const departments = await prisma.department.findMany();
  const designations = await prisma.designation.findMany();

  return (
    <div>
      {/* HEADER */}
      <h1 className="font-bold mx-170">Create Employee</h1>

      {/* FORM CARD */}
      <div>
        <form
          action={createEmployee}
          className="bg-zinc-900 p-6 border border-zinc-800 max-w-md flex flex-col mx-130 my-10"
        >
          {/* Name */}
          <input
            name="name"
            placeholder="Name"
            required
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      border border-zinc-700 space-y-4"
          />

          {/* Email */}
          <input
            name="email"
            placeholder="Email"
            required
            className="p-3
                       m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      border border-zinc-700 space-y-4"
          />

          {/* Department Dropdown */}
          <select
            name="departmentId"
            required
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      border border-zinc-700 space-y-4"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Designation Dropdown */}
          <select
            name="designationId"
            required
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      border border-zinc-700 space-y-4"
          >
            <option value="">Select Designation</option>
            {designations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-lime-400 hover:bg-lime-600 text-white
                      border border-zinc-700 px-0.5 py-4 m-14 rounded"
          >
            Create Employee
          </button>
        </form>
      </div>
    </div>
  );
}
