"use client";

import { Building, Laptop, LucideIcon, Users } from "lucide-react";
import { useEffect, useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  building: Building,
  laptop: Laptop,
};

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  const Icon = iconMap[icon];
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const steps = 50;
    const increment = value / steps;
    const interval = 1000 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current = current + increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-lime-500 border border-gray-400 rounded-xl p-4">
      <div className="flex justify-center">
        {Icon && <Icon className="w-15 h-15 text-white" />}
      </div>
      <p className="text-white text-xl font-bold text-center">{label}</p>
      <p className="text-white text-3xl font-bold text-center">{count}</p>
    </div>
  );
}

export default StatCard;
