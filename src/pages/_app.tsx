import "@/styles/globals.css";

import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const excludeNavbarPages = ["/", "/private", "/Private"];
  const excludeNavbar = excludeNavbarPages.includes(router.pathname);

  return (
    <>
      <Head>
        <title>SGA | Sistema Gestor Acessos</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <AuthProvider>
        <Layout excludeNavbar={excludeNavbar}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}
