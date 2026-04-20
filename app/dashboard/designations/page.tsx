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
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Designations</h1>

        <Link href="/dashboard/designations/create" style={styles.addBtn}>
          + Add Designation
        </Link>
      </div>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {designations.map((des) => (
            <tr key={des.id}>
              <td style={styles.td}>
                <span style={styles.badgeAlt}>{des.title}</span>
              </td>

              <td style={styles.td}>
                <Link
                  href={`/dashboard/designations/${des.id}/edit`}
                  style={styles.editBtn}
                >
                  Edit
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteDesignation(des.id);
                  }}
                  style={{ display: "inline", marginLeft: 10 }}
                >
                  <button style={styles.deleteBtn}>Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  page: {
    background: "#0a0a0a",
    minHeight: "100vh",
    padding: "20px",
    color: "white",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },

  title: {
    fontSize: "28px",
    color: "#a3e635",
    fontWeight: "bold",
  },

  addBtn: {
    background: "#a3e635",
    color: "#000",
    padding: "10px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#111",
    borderRadius: "8px",
    overflow: "hidden",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #333",
    color: "#a3e635",
    background: "#0f0f0f",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #222",
  },

  editBtn: {
    background: "#334155",
    color: "white",
    padding: "10px 10px",
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

  badgeAlt: {
    background: "#1e293b",
    color: "#93c5fd",
    padding: "6px 10px",
    borderRadius: "20px",
    display: "inline-block",
  },
};
