import { deleteDesignation } from "@/actions/designation.actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DesignationsPage() {
  const designations = await prisma.designation.findMany({
    orderBy: {
      title: "asc",
    },
  });

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lime-500 text-2xl my-2">Designations</h1>

        <Link href="/dashboard/designations/create" className="bg-lime-500 hover:bg-lime-700 text-white text-bold
                      border border-zinc-700 px-4 py-4 rounded">
          + Add Designation
        </Link>
      </div>

      {/* TABLE */}
      <table className="bg-gray-600 border-collapse sm:border-separate border border-gray-400 table-auto border-spacing-3 rounded-3xl">
        <thead>
          <tr>
            <th className="border-white text-lime-500">Title</th>
            <th className="border-white text-lime-500">Actions</th>
          </tr>
        </thead>

        <tbody>
          {designations.map((des) => (
            <tr key={des.id}>
              <td className="border-white text-lime-500 space-x-2">
                <span>{des.title}</span>
              </td>

              <td className="border-white text-lime-500 flex flex-2 space-x-2">
                <Link
                  href={`/dashboard/designations/${des.id}/edit`} className="bg-red-600 hover:bg-red-700 text-white
                      border border-zinc-700 px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteDesignation(des.id);
                  }}
                >
                  <button className="bg-sky-600 hover:bg-sky-700 text-white
                      border border-zinc-700 px-2 py-2 rounded">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
