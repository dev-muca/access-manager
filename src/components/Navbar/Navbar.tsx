import { useContext, useState } from "react";

import { NavWrapper } from "./NavWrapper";
import { ToggleButton } from "./ToggleButton";
import { LogoutButton } from "./LogoutButton";
import { Profile } from "./Profile";

import { UserContext } from "@/context/AuthContext";

export function Navbar() {
  const { Logout, session } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  return (
    <NavWrapper isOpen={open}>
      <Profile open={open} fullname={session?.fullname} />
      <ToggleButton isToggled={open} onClick={() => setOpen(!open)} />
      <LogoutButton onClick={Logout} />
    </NavWrapper>
  );
}
