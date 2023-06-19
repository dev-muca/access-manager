import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { userSession } = useContext(AuthContext);

  return <h1 className="p-8 text-2xl">Welcome, {userSession.fullname}</h1>;
}
