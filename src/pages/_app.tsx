import "@/styles/globals.css";

import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout/Layout";
import { UserProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const excludeNavbarPages = ["/", "404"];

  const excludeNavbar = excludeNavbarPages.includes(router.pathname);

  return (
    <>
      <Head>
        <title>SGA | Sistema Gestor Acessos</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <UserProvider>
        <Layout excludeNavbar={excludeNavbar}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}
