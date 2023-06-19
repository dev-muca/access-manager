import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { parseCookies } from "nookies";
import API from "@/services/web-api/methods";

export default function Home({ user }) {
  const { userSession } = useContext(AuthContext);

  return <h1 className="p-8 text-2xl">Welcome, {userSession.fullname}</h1>;
}

export async function getServerSideProps(context) {
  const { ["token"]: token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
