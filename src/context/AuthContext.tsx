import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ICredentials } from "@/interfaces/generics";
import ApiRequest from "@/services/API-Request";
import { IUser } from "@/interfaces/user";

interface ProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  session: IUser | null;
  Authentication: ({ username, password }: ICredentials) => Promise<any>;
  Logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: ProviderProps) {
  //
  const router = useRouter();
  const [session, setSession] = useState<IUser | null>(null);

  useEffect(() => {
    const { ["sga-auth@token"]: token } = parseCookies();

    if (token)
      ApiRequest.GetInfo(token)
        .then((response) => {
          setSession(response!.user);
          router.push("/dashboard");
        })
        .catch((err) => console.log(err));
  }, []);

  async function Authentication({ username, password }: ICredentials) {
    try {
      const response = await ApiRequest.Authenticate({ username, password });

      if (response?.user?.validationToken) {
        setCookie(undefined, "sga-auth@token", response.user.validationToken, { expiresIn: 60 * 60 * 1 });
        setSession(response.user);
        router.push("/dashboard");
      }

      return response?.error;
    } catch (err: any) {
      console.log("Context Error:", err);
      return err;
    }
  }

  function Logout() {
    destroyCookie(undefined, "sga-auth@token");
    alert("Sessão encerrada");
    router.push("/");
  }

  return <UserContext.Provider value={{ Authentication, Logout, session }}>{children}</UserContext.Provider>;
  //
}