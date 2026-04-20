import { updateDepartment } from "@/actions/department.actions";
import { prisma } from "@/lib/prisma";

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const dept = await prisma.department.findUnique({
    where: { id },
  });

  if (!dept) {
    return (
      <div>
        <p>Department not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <h1 className="font-bold mx-170">Edit Department</h1>

      {/* CARD */}
      <div>
        <form
          action={async (formData) => {
            "use server";
            await updateDepartment(id, formData);
          }}
          className="bg-zinc-900 p-6 border border-zinc-800 max-w-md flex flex-col mx-130 my-10"
        >
          {/* INPUT */}
          <input
            name="name"
            defaultValue={dept.name}
            placeholder="Department Name"
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      border border-zinc-700 space-y-4"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-lime-400 hover:bg-lime-600 text-white
                      border border-zinc-700 px-0.5 py-4 m-14 rounded"
          >
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
}
