import "@/styles/globals.css";

import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { Layout } from "@/components/Layout";
import { useContext } from "react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function App({ Component, pageProps }) {
  const Router = useRouter();

  // const { userSession } = useContext(AuthContext);

  // Defina a lista de páginas que não precisam da Navbar
  const excludeNavbarPages = ["/"];

  // Verifica se a página atual está na lista de exclusão
  const excludeNavbar = excludeNavbarPages.includes(Router.pathname);

  return (
    <AuthProvider>
      <Layout excludeNavbar={excludeNavbar}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
