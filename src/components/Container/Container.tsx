import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { BiLoaderAlt } from "react-icons/bi";

interface ContainerProps {
  title?: string;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

const Container = ({ title, loading = false, children, className }: ContainerProps) => {
  const ChildrenContainerClass = twMerge("w-full h-full px-7 pb-6", className);

  return (
    <main className="w-full flex justify-center items-center overflow-hidden p-2">
      {loading ? (
        <BiLoaderAlt size={32} className="animate-spin" color="#FFF" />
      ) : (
        <section className="w-full h-[calc(100vh-16px)] overflow-y-auto overflow-x-hidden bg-white text-black flex flex-col gap-4 rounded-md shadow-md">
          {title && <h1 className="text-xl px-7 pt-7 pb-5">{title}</h1>}
          <div className={ChildrenContainerClass}>{children}</div>
        </section>
      )}
    </main>
  );
};

export default Container;
