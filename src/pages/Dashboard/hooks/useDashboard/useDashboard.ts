import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const useDashboard = () => {
  const { session } = useContext(AuthContext);

  const { fullname } = session;

  return { fullname };
};

export default useDashboard;
