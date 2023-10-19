import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface MiddleProps {
  children: ReactNode;
}

const AuthMiddleware = ({ children }: MiddleProps) => {
  const router = useRouter();

  useEffect(() => {
    const { ["sga-auth@token"]: token } = parseCookies();

    if (!token) router.push("/");
  }, [router]);

  return children;
};

export default AuthMiddleware;
