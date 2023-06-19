import API from "@/services/web-api/methods";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { setCookie, parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const Router = useRouter();

  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const { ["token"]: token } = parseCookies();

    if (!!token) {
      API.getUserDataRequest(token)
        .then((response) => {
          console.log(response.data);
          setUserSession(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          Router.push("/home");
        });
    }
  }, []);

  async function signIn(data) {
    const response = await API.signInRequest(data);

    if (!!response.token) {
      setCookie(undefined, "token", response.token);
      Router.push("/home");
    }

    return response;
  }

  return <AuthContext.Provider value={{ userSession, signIn }}>{children}</AuthContext.Provider>;
}
