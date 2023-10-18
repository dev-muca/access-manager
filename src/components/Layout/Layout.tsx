import { ReactNode } from "react";

import Navbar from "../Navbar";
import AuthMiddleware from "../AuthMiddleware";

interface LayoutProps {
  excludeNavbar: boolean;
  children: ReactNode;
}

const Layout = ({ excludeNavbar, children }: LayoutProps) => {
  if (excludeNavbar) return <>{children}</>;

  return (
    <AuthMiddleware>
      <main className="flex flex-row">
        <Navbar />
        {children}
      </main>
    </AuthMiddleware>
  );
};

export default Layout;
