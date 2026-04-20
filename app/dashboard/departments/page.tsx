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
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Departments</h1>

        <Link href="/dashboard/departments/create" style={styles.addBtn}>
          + Add Department
        </Link>
      </div>

      {/* TABLE */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Department Name</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} style={styles.row}>
                <td style={styles.td}>
                  <span style={styles.badge}>{dept.name}</span>
                </td>

                <td style={styles.td}>
                  <div style={styles.actions}>
                    <Link
                      href={`/dashboard/departments/${dept.id}/edit`}
                      style={styles.editBtn}
                    >
                      Edit
                    </Link>

                    <form
                      action={async () => {
                        "use server";
                        await deleteDepartment(dept.id);
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
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0a0a0a",
    minHeight: "100vh",
    padding: "30px",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    fontSize: "28px",
    color: "#a3e635",
    fontWeight: "bold",
  },

  addBtn: {
    background: "#a3e635",
    color: "#000",
    padding: "10px 15px",
    borderRadius: "8px",
    fontWeight: "bold",
    textDecoration: "none",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#111",
    borderRadius: "10px",
    overflow: "hidden",
  },

  theadRow: {
    background: "#1a1a1a",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    color: "#a3e635",
    borderBottom: "1px solid #333",
  },

  row: {
    borderBottom: "1px solid #222",
  },

  td: {
    padding: "12px",
  },

  badge: {
    background: "#14532d",
    padding: "6px 10px",
    borderRadius: "20px",
    display: "inline-block",
    color: "#a3e635",
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
};
