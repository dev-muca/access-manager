import { Navbar } from "./Navbar/Navbar";
import { AuthMiddleware } from "./AuthMiddleware";

export function Layout({ excludeNavbar, children }) {
  if (excludeNavbar) return <div>{children}</div>;

  return (
    <AuthMiddleware>
      <div className="flex flex-row">
        <Navbar />

        {children}
      </div>
    </AuthMiddleware>
  );
}
