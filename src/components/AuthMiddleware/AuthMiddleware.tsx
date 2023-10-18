import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface MiddleProps {
  children: ReactNode;
}

const AuthMiddleware = ({ children }: MiddleProps) => {
  const Router = useRouter();

  useEffect(() => {
    const { ["sga-auth@token"]: token } = parseCookies();

    if (!token) Router.push("/");
  }, []);

  return children;
};

export default AuthMiddleware;
