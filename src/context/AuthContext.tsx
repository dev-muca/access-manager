import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

import ICredentials from "@/@types/ICredentials";
import IUser from "@/@types/IUser";

import apiBaseUrl from "@/utils/host";

interface ProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  session: IUser;
  greetings: boolean;
  setGreetings: Dispatch<SetStateAction<boolean>>;
  Auth: ({ username, password }: ICredentials) => Promise<any>;
  Logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: ProviderProps) {
  //
  const router = useRouter();
  const [session, setSession] = useState<IUser>(null!);
  const [greetings, setGreetings] = useState(true);

  useEffect(() => {
    const { ["sga-auth@token"]: token } = parseCookies();

    if (token) {
      fetch(`${apiBaseUrl}/api/user/auth?validationToken=${token}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setSession(data);
          router.push("/Dashboard");
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function Auth({ username, password }: ICredentials) {
    try {
      const res = await fetch(`${apiBaseUrl}/api/user/auth`, {
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
      console.log("ERROR | use Context | more:", err.message);
    }
  }

  function Logout() {
    destroyCookie(undefined, "sga-auth@token");
    setSession(null!);
    setGreetings(true);
    alert("Sessão encerrada");
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ session, greetings, setGreetings, Auth, Logout }}>{children}</AuthContext.Provider>
  );
  //
}
