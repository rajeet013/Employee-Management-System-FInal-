import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          padding: "20px",
          background: "#111",
          color: "#fff",
        }}
      >
        <h2>EMS System</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/employees">Employees</Link>
          <Link href="/dashboard/departments">Departments</Link>
          <Link href="/dashboard/designations">Designations</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
