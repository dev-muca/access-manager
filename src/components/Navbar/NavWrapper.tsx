import { ReactNode } from "react";

interface NavWrapperProps {
  isOpen: boolean;
  children: ReactNode;
}

export function NavWrapper({ isOpen, children }: NavWrapperProps) {
  return (
    <nav
      className={`bg-white text-black sticky top-0 w-16 left-0 h-[98vh] rounded-md m-2 flex flex-col duration-300 shrink-0 overflow-hidden ${
        isOpen ? "w-80 shadow-2xl" : "w-16 shadow-md"
      }`}
    >
      {children}
    </nav>
  );
}
