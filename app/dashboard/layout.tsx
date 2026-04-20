import Sidebar from "./sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 border-b border-gray-800 flex items-center justify-between px-6">
          <h1 className="text-lime-400 font-semibold">
            Employee Management System
          </h1>

          <div className="text-sm text-gray-400">Admin Panel</div>
        </header>

        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
