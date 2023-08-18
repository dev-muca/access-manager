import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { BiLoaderAlt } from "react-icons/bi";

interface ContainerProps {
  title?: string;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

export function Container({ title, loading = false, children, className }: ContainerProps) {
  const ContainerClass = twMerge(
    "h-full bg-white text-black px-10 py-6 rounded-md shadow-md overflow-y-auto",
    className
  );

  return (
    <main className="w-full p-2 border border-red-600">
      {loading ? (
        <BiLoaderAlt size={32} className="animate-spin" color="#FFF" />
      ) : (
        <section className={ContainerClass}>
          {title && <h1 className="text-xl mt-2 mb-8 ml-1">{title}</h1>}
          {children}
        </section>
      )}
    </main>
  );
}
