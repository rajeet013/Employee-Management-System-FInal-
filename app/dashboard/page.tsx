import StatCard from "@/components/StatCard";
import { prisma } from "@/lib/prisma";

export default async function DashboardHome() {
  const totalEmployees = await prisma.employee.count();
  const totalDepartments = await prisma.department.count();
  const totalDesignations = await prisma.designation.count();

  const thisMonth = new Date();
  thisMonth.setDate(1);

  const totalAll = [
    {
      title: "Employees",
      value: totalEmployees,
      icon: "users",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: "building",
    },
    {
      title: "Designations",
      value: totalDesignations,
      icon: "laptop",
    },
  ];

  return (
    <div className="bg-background text-foreground flex flex-col items-start md:items-center justify-center mb-10 w-full max-w-7xl mx-auto p-10 md:p-4">
      <h1 className="text-lime-400 font-bold text-4xl xl:text-6xl">
        Dashboard
      </h1>
      <p className="text-lime-400 font-bold text-xl xl:text-2xl mb-4">
        Welcome to Employee Management System
      </p>
      <div className="grid grid-cols-2 md:flex md:flex-row gap-4 xl:flex-row">
        {totalAll.map((item) => (
          <StatCard
            key={item.title}
            label={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
