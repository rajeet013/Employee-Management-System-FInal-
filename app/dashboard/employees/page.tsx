import { deleteEmployee } from "@/actions/employee.actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EmployeesPage({ searchParams }: any) {
  const search = (searchParams?.search ?? "").trim();
  const page = Number(searchParams?.page ?? 1);
  const limit = 5;

  const where =
    search.length > 0
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined;

  const employees = await prisma.employee.findMany({
    where,
    include: {
      department: true,
      designation: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.employee.count({ where });
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      {/* HEADER CARD */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lime-500 text-2xl my-2">Employees</h1>
          <p>Manage all employee records</p>
        </div>
        <div>
          <Link href="/dashboard/employees/create" className="bg-lime-500 hover:bg-lime-700 text-white text-bold
                      border border-zinc-700 px-4 py-4 rounded">
          + Add Employee
        </Link> 
        </div>
      </div>

      {/* SEARCH CARD */}
      <div>
        <form method="GET">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search employees by name or email..."
            className="p-3
                       my-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      border border-gray-400"
          />
          <button className="bg-lime-400 hover:bg-lime-600 text-white
                      border border-gray-400 px-3 py-3 m-3 rounded">Search</button>
        </form>
      </div>

      {/* TABLE CARD */}
      <div>
        <table className="bg-gray-600 border-collapse sm:border-separate border border-gray-400 table-auto border-spacing-3 rounded-3xl">
          <thead>
            <tr>
              <th className="border-white text-lime-500">Name</th>
              <th className="border-white text-lime-500">Email</th>
              <th className="border-white text-lime-500">Department</th>
              <th className="border-white text-lime-500">Designation</th>
              <th className="border-white text-lime-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="border-white text-lime-500">{emp.name}</td>
                <td className="border-white text-lime-500">{emp.email}</td>
                <td className="border-white text-lime-500">
                  <span>
                    {emp.department?.name || "N/A"}
                  </span>
                </td>
                <td className="border-white text-lime-500">
                  <span>
                    {emp.designation?.title || "N/A"}
                  </span>
                </td>

                <td className="border-white text-lime-500">
                  <div className="flex flex-2 space-x-2">
                    <Link
                      href={`/dashboard/employees/${emp.id}/edit`}
                      className="bg-red-600 hover:bg-red-700 text-white
                      border border-zinc-700 px-4 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteEmployee(emp.id);
                      }}
                    >
                      <button className="bg-sky-600 hover:bg-sky-700 text-white
                      border border-zinc-700 px-2 py-2 rounded">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}${search ? `&search=${search}` : ""}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
