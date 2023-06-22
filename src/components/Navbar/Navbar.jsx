import { useContext, useState } from "react";
import { TfiMenu, TfiArrowLeft } from "react-icons/tfi";

import { AuthContext } from "@/context/AuthContext";

import { Profile } from "./Profile";
import { ItemMenu } from "./Menu/ItemMenu";

export function Navbar() {
  //
  const { userSession, signOut } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`${
        open ? "w-80 shadow-2xl" : "w-16 shadow-md"
      } top-0 w-16 left-0 h-screen border-r flex flex-col items-center duration-300 relative shrink-0`}
    >
      <Profile fullname={userSession?.fullname} avatar={userSession?.avatar} />

      <div className="w-full flex justify-end items-center py-4 pr-5">
        <button onClick={() => setOpen(!open)}>{open ? <TfiArrowLeft size={20} /> : <TfiMenu size={20} />}</button>
      </div>

      <ul className="w-full my-2 px-2 flex flex-col justify-start items-center gap-4">
        <ItemMenu name="Início" icon="HiHome" to="/home" />
        <ItemMenu name="Colaboradores" icon="SlPeople" color="blue" to="/colaboradores" />
      </ul>

      <button onClick={signOut} className="absolute bottom-0 py-1 border-t w-full hover:bg-red-100">
        Sair
      </button>
    </nav>
  );
}
