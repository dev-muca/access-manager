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
      API.getDecodedTokenData(token)
        .then((decoded) => setUserSession(decoded.data))
        .catch((err) => setUserSession(null))
        .finally(() => Router.push("/home"));
    }
  }, []);

  async function signIn(data) {
    const signResponse = await API.signInRequest(data);

    if (signResponse.token) {
      setCookie(undefined, "token", signResponse.token);
      const response = await API.getProfileInfoByUsernameRequest(data.username);
      setUserSession(response.profileInfo);
      Router.push("/home");
    }

    return signResponse;
  }

  async function signOut() {
    alert("Sua sessão foi encerrada");
    Router.push("/");
    destroyCookie(undefined, "token");
    setUserSession(null);
  }

  return (
    <AuthContext.Provider value={{ userSession, setUserSession, signIn, signOut }}>{children}</AuthContext.Provider>
  );
}
