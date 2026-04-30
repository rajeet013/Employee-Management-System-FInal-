"use client";

import { navIteams } from "@/constants/nav-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 p-8 items-start xl:items-center justify-center mb-10 border border-gray-700 rounded-b-xl">
      <ThemeSwitch />
      <h2 className="text-2xl font-bold text-lime-400">EMS System</h2>

      <div className="grid grid-cols-2 gap-3 text-md md:flex md:flex-row">
        {navIteams.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`p-3 rounded-md transition ${
              pathname === item.href
                ? "bg-lime-500 text-black font-semibold transition ease-out duration-500"
                : "text-gray-300 hover:text-lime-400 hover:bg-gray-900"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
