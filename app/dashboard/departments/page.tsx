import { deleteDepartment } from "@/actions/department.actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DepartmentsPage() {
  // ❗ FIX: removed createdAt because your schema doesn't have it
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lime-500 text-2xl my-2">Departments</h1>

        <Link href="/dashboard/departments/create" className="bg-lime-500 hover:bg-lime-700 text-white text-bold
                      border border-zinc-700 px-4 py-4 rounded">
          + Add Department
        </Link>
      </div>

      {/* TABLE */}
      <div>
        <table className="bg-gray-600 border-collapse sm:border-separate border border-gray-400 table-auto border-spacing-3 rounded-3xl">
          <thead>
            <tr>
              <th className="border-white text-lime-500">Department Name</th>
              <th className="border-white text-lime-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td className="border-white text-lime-500">
                  <span>{dept.name}</span>
                </td>

                <td>
                  <div className="border-white text-lime-500 flex flex-2 space-x-2">
                    <Link
                      href={`/dashboard/departments/${dept.id}/edit`} className="bg-red-600 hover:bg-red-700 text-white
                      border border-zinc-700 px-4 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteDepartment(dept.id);
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
      </div>
    </div>
  );
}
