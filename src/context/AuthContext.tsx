import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

import useApi from "@/hooks/useApi";
import IUser from "@/@types/IUser";
import ICredentials from "@/@types/Icredentials";

interface ProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  session: IUser;
  Authentication: ({ username, password }: ICredentials) => Promise<any>;
  Logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: ProviderProps) {
  //
  const router = useRouter();
  const { getAuth, getUserInfo } = useApi();
  const [session, setSession] = useState<IUser>(null!);

  useEffect(() => {
    const { ["sga-auth@token"]: token } = parseCookies();

    if (token)
      getUserInfo(token)
        .then(({ user, error }) => {
          if (error) console.log(error);

          setSession(user!);
          router.push({ pathname: "/Dashboard" });
        })
        .catch((err) => console.log(err.message));
  }, []);

  async function Authentication({ username, password }: ICredentials) {
    try {
      const { user, error } = await getAuth({ username, password });

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

  return <AuthContext.Provider value={{ Authentication, Logout, session }}>{children}</AuthContext.Provider>;
  //
}
