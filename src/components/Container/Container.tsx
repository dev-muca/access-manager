import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/router";

import { MdArrowBack } from "react-icons/md";

interface ContainerProps {
  title?: string;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  fixedTitle?: true;
  noBackward?: true;
}

const Container = ({ title, loading = false, children, className, fixedTitle, noBackward }: ContainerProps) => {
  const router = useRouter();

  return (
    <main className="w-full flex justify-center items-center overflow-hidden p-2">
      {loading ? (
        <BiLoaderAlt size={32} className="animate-spin" color="#FFF" />
      ) : (
        <section className="w-full h-[calc(100vh-16px)] overflow-y-auto overflow-x-hidden bg-white text-black flex flex-col gap-4 rounded-md shadow-md">
          {title && (
            <h1
              className={twMerge(
                "text-xl px-7 pt-7 pb-5 flex flex-row items-center gap-4",
                fixedTitle ? "sticky top-0 bg-white z-[999999] pb-8 border-b" : null
              )}
            >
              {!noBackward && <MdArrowBack size={18} onClick={() => router.back()} className="cursor-pointer " />}
              {title}
            </h1>
          )}
          <div className={twMerge("w-full h-full px-7 pb-6", className)}>{children}</div>
        </section>
      )}
    </main>
  );
};

export default Container;
