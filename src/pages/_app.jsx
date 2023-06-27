import "@/styles/globals.css";

import { useRouter } from "next/router";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const Router = useRouter();

  // Lista de páginas que não precisam da Navbar
  const excludeNavbarPages = ["/"];

  // Verifica se a página atual está na lista de exclusão
  const excludeNavbar = excludeNavbarPages.includes(Router.pathname);

  return (
    <>
      <Head>
        <title>SGA | Sistema gestor de acessos</title>
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <AuthProvider>
        <Layout excludeNavbar={excludeNavbar}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}
