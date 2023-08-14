import { useContext, useState } from "react";

import { ToggleButton } from "./ToggleButton";
import { LogoutButton } from "./LogoutButton";

import { UserContext } from "@/context/AuthContext";
import { twMerge } from "tailwind-merge";
import { FaPeopleCarry } from "react-icons/fa";
import Link from "next/link";

export function Navbar() {
  const { Logout, session } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const NavClass = twMerge(
    "w-16 h-full rounded-md bg-white text-black duration-200 relative",
    `${open ? "w-80 shadow-2xl" : "w-16 shadow-md"}`
  );

  return (
    <nav className="h-[100vh] p-2">
      <main className={NavClass}>
        <ToggleButton fullname={session?.fullname} isToggled={open} onClick={() => setOpen(!open)} />
        <LogoutButton onClick={Logout} />
      </main>
    </nav>
  );
}
