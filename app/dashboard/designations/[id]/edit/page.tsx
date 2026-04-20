import { updateDesignation } from "@/actions/designation.actions";
import { prisma } from "@/lib/prisma";

export default async function EditDesignationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const designation = await prisma.designation.findUnique({
    where: { id },
  });

  if (!designation) {
    return (
      <div style={styles.page}>
        <p style={styles.error}>Designation not found</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h1 style={styles.title}>Edit Designation</h1>

      {/* CARD */}
      <div style={styles.card}>
        <form
          action={async (formData) => {
            "use server";
            await updateDesignation(id, formData);
          }}
          style={styles.form}
        >
          {/* INPUT */}
          <input
            name="title"
            defaultValue={designation.title}
            placeholder="Designation Title"
            style={styles.input}
          />

          {/* BUTTON */}
          <button type="submit" style={styles.submitBtn}>
            Update Designation
          </button>
        </form>
      </div>
    </div>
  );
}

/* ===================== STYLES ===================== */

const styles = {
  page: {
    background: "#0a0a0a",
    minHeight: "100vh",
    padding: "24px",
    color: "white",
    fontFamily: "Arial",
  },

  title: {
    color: "#a3e635",
    fontSize: "26px",
    marginBottom: "16px",
    fontWeight: "bold",
  },

  card: {
    background: "#0f0f0f",
    border: "1px solid #1f1f1f",
    borderRadius: "12px",
    padding: "20px",
    width: "350px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#111",
    color: "white",
  },

  submitBtn: {
    background: "#a3e635",
    color: "#000",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "8px",
  },

  error: {
    color: "#f87171",
    fontSize: "16px",
  },
};
