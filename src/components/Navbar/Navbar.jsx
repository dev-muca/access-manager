import { useContext, useState } from "react";
import { TfiMenu, TfiArrowLeft } from "react-icons/tfi";

import { AuthContext } from "@/context/AuthContext";

import { Profile } from "./Profile";
import { Menu } from "./Menu/Menu";
import { Toggle } from "./Toggle";
import { Logout } from "./Logout";

export function Navbar() {
  //

  const { userSession, signOut } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const staticOptions = [
    { id: 2, name: "Colaboradores", icon: "SlPeople", path: "/colaboradores" },
    { id: 3, name: "Acessos", icon: "RiGitPullRequestLine", path: "/home" },
  ];

  return (
    <nav
      className={`${
        open ? "w-80 shadow-2xl" : "w-16 shadow-md"
      } sticky top-0 w-16 left-0 h-screen border-r flex flex-col items-center duration-300 shrink-0`}
    >
      <Profile fullname={userSession?.fullname} avatar={userSession?.avatar} />
      <Toggle open={open} onClick={() => setOpen(!open)} />
      <Menu options={staticOptions} onClick={() => setOpen(false)} />
      <Logout onClick={signOut} />
    </nav>
  );
}
