import { useContext, useState } from "react";
import { NavWrapper } from "./NavWrapper";
import { ToggleButton } from "./ToggleButton";
import { LogoutButton } from "./LogoutButton";

import { UserContext } from "@/context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

export function Navbar() {
  const { Logout, session } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  return (
    <NavWrapper isOpen={open}>
      <ToggleButton isToggled={open} onClick={() => setOpen(!open)} />

      <div className={`flex flex-row gap-2 items-center absolute m-5 pb-1.5 ${open ? "block" : "hidden"}`}>
        <FaUserCircle size={24} />
        <span className="shrink-0">{session?.fullname}</span>
      </div>

      <LogoutButton onClick={Logout} />
    </NavWrapper>
  );
}
