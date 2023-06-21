import { useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

export function AuthMiddleware({ children }) {
  const Router = useRouter();

  useEffect(() => {
    const { ["token"]: token } = parseCookies();

    if (!token) Router.push("/");
  }, [Router]);

  return children;
}

// export async function getServerSideProps(context) {
//   const { ["token"]: token } = parseCookies(context);

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
