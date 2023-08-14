import { ReactNode } from "react";

interface NavWrapperProps {
  isOpen: boolean;
  children: ReactNode;
}

export function NavWrapper({ isOpen, children }: NavWrapperProps) {
  return (
    <nav className="h-[100vh] p-2">
      <main
        className={`w-16 h-full rounded-md bg-white text-black duration-200 relative ${
          isOpen ? "w-80 shadow-2xl" : "w-16 shadow-md"
        }`}
      >
        {children}
      </main>
    </nav>
  );
}
