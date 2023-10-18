import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  color?: string;
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className, color = "Default" }: BadgeProps) => {
  const colorClass: any = {
    default: "bg-blue-100 text-blue-800 border border-blue-400",
    dark: "bg-red-100 text-red-800 border border-red-400",
    red: "bg-red-100 text-red-800 border border-red-400",
    green: "bg-green-100 text-green-800 border border-green-400",
    yellow: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    indigo: "bg-indigo-100 text-indigo-800 border border-indigo-400",
    purple: "bg-purple-100 text-purple-800 border border-purple-400",
    pink: "bg-pink-100 text-pink-800 border border-pink-400",
  };

  const badgeClass = twMerge(
    "text-xs text-center font-medium mr-2 px-2.5 py-0.5 rounded",
    colorClass[color],
    className
  );

  return <span className={badgeClass}>{children}</span>;
};

export default Badge;
