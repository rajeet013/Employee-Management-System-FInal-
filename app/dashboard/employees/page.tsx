import { deleteEmployee } from "@/actions/employee.actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function EmployeesPage() {
  const employees = await prisma.employee.findMany({
    include: {
      department: true,
      designation: true,
    },
  });

  return (
    <div>
      <h1>Employees</h1>

      {/* Create Button */}
      <Link href="/dashboard/employees/create">
        <button>Add Employee</button>
      </Link>

      <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department?.name ?? "N/A"}</td>
              <td>{emp.designation?.title ?? "N/A"}</td>

              {/* ACTIONS */}
              <td>
                {/* EDIT */}
                <Link href={`/dashboard/employees/${emp.id}/edit`}>
                  <button>Edit</button>
                </Link>

                {/* DELETE */}
                <form
                  action={async () => {
                    "use server";
                    await deleteEmployee(emp.id);
                  }}
                  style={{ display: "inline" }}
                >
                  <button
                    type="submit"
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
