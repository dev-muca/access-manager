import API from "@/services/web-api/methods";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  //
  const Router = useRouter();
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const { ["token"]: token } = parseCookies();

    if (token) {
      API.getUserDataRequest(token)
        .then((response) => setUserSession(response.data))
        .catch((err) => {
          console.log("ERROR:", err);
          setUserSession(null);
        })
        .finally(() => {
          Router.push("/home");
          console.log(userSession);
        });
    }
  }, []);

  async function signIn(data) {
    const response = await API.signInRequest(data);

    if (!!response.token) {
      setCookie(undefined, "token", response.token);
      setUserSession(response.user);
      Router.push("/home");
    }

    return response;
  }

  async function signOut() {
    destroyCookie(undefined, "token");
    setUserSession(null);
    alert("Sua sessão foi encerrada");
    Router.push("/");
  }

  return <AuthContext.Provider value={{ userSession, signIn, signOut }}>{children}</AuthContext.Provider>;
}
