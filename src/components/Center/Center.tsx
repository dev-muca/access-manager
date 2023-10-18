import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CenterProps {
  children: ReactNode;
  className?: string;
}

const Center = ({ children, className }: CenterProps) => {
  const mainClass = twMerge(`w-screen h-screen flex justify-center items-center`, className);
  return <main className={mainClass}>{children}</main>;
};

export default Center;
