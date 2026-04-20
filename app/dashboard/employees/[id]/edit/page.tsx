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
    return (
      <div>
        <p>Employee not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <h1 className="font-bold mx-170">Edit Employee</h1>

      {/* FORM CARD */}
      <div>
        <form
          action={async (formData) => {
            "use server";
            await updateEmployee(id, formData);
          }}
          className="bg-zinc-900 p-6 border border-zinc-800 max-w-md flex flex-col mx-130 my-10"
        >
          {/* Name */}
          <input
            name="name"
            defaultValue={employee.name}
            placeholder="Name"
            required
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      focus:border-0 focus:outline-none border-zinc-700 space-y-4"
          />

          {/* Email */}
          <input
            name="email"
            defaultValue={employee.email}
            placeholder="Email"
            required
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      focus:border-0 focus:outline-none border-zinc-700 space-y-4"
          />

          {/* Department */}
          <select
            name="departmentId"
            defaultValue={employee.departmentId}
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      focus:border-0 focus:outline-none border-zinc-700 space-y-4"
          >
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Designation */}
          <select
            name="designationId"
            defaultValue={employee.designationId}
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      focus:border-0 focus:outline-none border-zinc-700 space-y-4"
          >
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
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
}
