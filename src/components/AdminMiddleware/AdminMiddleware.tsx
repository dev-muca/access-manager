import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { AuthContext } from "@/context/AuthContext";

interface MiddleProps {
  children: ReactNode;
}

const AdminMiddleware = ({ children }: MiddleProps) => {
  const { session } = useContext(AuthContext);

  const { data, error } = useFetch({
    endpoint: `/api/ad/user/admin?username=${session?.username}`,
    method: "GET",
    dependencies: [session?.id],
  });

  if (data?.isAdmin) {
    return children;
  }
};

export default AdminMiddleware;
