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
    <div style={styles.page}>
      {/* HEADER CARD */}
      <div style={styles.headerCard}>
        <div>
          <h1 style={styles.title}>Employees</h1>
          <p style={styles.subtitle}>Manage all employee records</p>
        </div>

        <Link href="/dashboard/employees/create" style={styles.addBtn}>
          + Add Employee
        </Link>
      </div>

      {/* SEARCH CARD */}
      <div style={styles.card}>
        <form method="GET" style={styles.searchBox}>
          <input
            name="search"
            defaultValue={search}
            placeholder="Search employees by name or email..."
            style={styles.searchInput}
          />
          <button style={styles.searchBtn}>Search</button>
        </form>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Designation</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} style={styles.row}>
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.email}</td>
                <td style={styles.td}>
                  <span style={styles.badge}>
                    {emp.department?.name || "N/A"}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={styles.badgeAlt}>
                    {emp.designation?.title || "N/A"}
                  </span>
                </td>

                <td style={styles.td}>
                  <div style={styles.actions}>
                    <Link
                      href={`/dashboard/employees/${emp.id}/edit`}
                      style={styles.editBtn}
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteEmployee(emp.id);
                      }}
                    >
                      <button style={styles.deleteBtn}>Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}${search ? `&search=${search}` : ""}`}
              style={styles.pageBtn}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0a0a0a",
    minHeight: "100vh",
    padding: "24px",
    color: "white",
    fontFamily: "Arial",
  },

  headerCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px",
    border: "1px solid #1f1f1f",
    borderRadius: "12px",
    background: "#0f0f0f",
    marginBottom: "16px",
  },

  title: {
    fontSize: "28px",
    color: "#a3e635",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#777",
    fontSize: "13px",
    marginTop: "4px",
  },

  card: {
    background: "#0f0f0f",
    border: "1px solid #1f1f1f",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px",
  },

  addBtn: {
    background: "#a3e635",
    color: "#000",
    padding: "10px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  searchBox: {
    display: "flex",
    gap: "10px",
  },

  searchInput: {
    flex: 1,
    padding: "10px",
    background: "#111",
    border: "1px solid #333",
    color: "white",
    borderRadius: "8px",
  },

  searchBtn: {
    background: "#a3e635",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "black",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #222",
    color: "#a3e635",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #1f1f1f",
  },

  row: {
    transition: "0.2s",
  },

  badge: {
    background: "#14532d",
    color: "#a3e635",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "18px",
  },

  badgeAlt: {
    background: "#1e293b",
    color: "#93c5fd",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "18px",
  },

  actions: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  editBtn: {
    background: "#334155",
    color: "white",
    padding: "6px 10px",
    borderRadius: "6px",
    textDecoration: "none",
  },

  deleteBtn: {
    background: "#7f1d1d",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  pagination: {
    marginTop: "12px",
    display: "flex",
    gap: "8px",
  },

  pageBtn: {
    padding: "6px 10px",
    background: "#111",
    border: "1px solid #333",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
  },
};
