"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Employees", href: "/dashboard/employees" },
  { name: "Departments", href: "/dashboard/departments" },
  { name: "Designations", href: "/dashboard/designations" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-lime-500 p-6 relative">
      <h2 className="text-2xl font-bold text-lime-400 mb-8">EMS System</h2>

      <nav className="flex flex-col gap-2 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-md transition ${
              pathname === item.href
                ? "bg-lime-500 text-black font-semibold"
                : "text-gray-300 hover:text-lime-400 hover:bg-gray-900"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 text-xs text-gray-500">© EMS v1.0</div>
    </aside>
  );
}
