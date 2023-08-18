import { ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";
import { AuthMiddleware } from "../Middleware/AuthMiddleware";

interface LayoutProps {
  excludeNavbar: any;
  children: ReactNode;
}

export function Layout({ excludeNavbar, children }: LayoutProps) {
  if (excludeNavbar) return <>{children}</>;

  return (
    <AuthMiddleware>
      <main className="flex flex-row">
        <Navbar />
        {children}
      </main>
    </AuthMiddleware>
  );
}
