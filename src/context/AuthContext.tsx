import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

// import useApi from "@/hooks/useApi";
import IUser from "@/@types/IUser";
import ICredentials from "@/@types/ICredentials";
import useApi from "@/hooks/useApi";

interface ProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  session: IUser;
  Auth: ({ username, password }: ICredentials) => Promise<any>;
  Logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: ProviderProps) {
  //
  const router = useRouter();
  const [session, setSession] = useState<IUser>(null!);

  useEffect(() => {
    const { ["sga-auth@token"]: token } = parseCookies();

    if (token) {
      fetch(`http://localhost:3000/api/user/auth?validationToken=${token}`, { method: "GET" })
        .then((res) => res.json())
        .then(({ user }) => setSession(user))
        .catch((err) => console.log(err));
    }
  }, []);

  async function Auth({ username, password }: ICredentials) {
    try {
      const res = await fetch("http://localhost:3000/api/user/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const { user, error } = await res.json();
      if (error) return error;

      if (user?.validationToken) {
        setCookie(undefined, "sga-auth@token", user.validationToken, { expiresIn: 60 * 60 * 1 });
        setSession(user);
        router.push("/Dashboard");
      }
    } catch (err: any) {
      console.log("Context Error:", err);
      // return err;
    }
  }

  function Logout() {
    destroyCookie(undefined, "sga-auth@token");
    alert("Sessão encerrada");
    router.push("/");
  }

  return <AuthContext.Provider value={{ Auth, Logout, session }}>{children}</AuthContext.Provider>;
  //
}
