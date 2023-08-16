import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { BiLoaderAlt } from "react-icons/bi";

interface ContainerProps {
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

export function Container({ loading = false, children, className }: ContainerProps) {
  const ContainerClass = twMerge(
    "w-full h-full max-h-[97.5vh] overflow-hidden bg-white text-black px-5 py-4 rounded-md shadow-md",
    className
  );
  return (
    <main className="w-full py-2 pr-2 flex justify-center items-center">
      {loading ? (
        <BiLoaderAlt size={32} className="animate-spin" color="#FFF" />
      ) : (
        <section className={ContainerClass}>{children}</section>
      )}
    </main>
  );
}
