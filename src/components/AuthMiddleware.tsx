import { ReactNode, useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

interface MiddleProps {
  children: ReactNode;
}

export function AuthMiddleware({ children }: MiddleProps) {
  const Router = useRouter();

  useEffect(() => {
    const { ["sga-auth@token"]: token } = parseCookies();

    if (!token) Router.push("/");
  }, [Router]);

  return children;
}
