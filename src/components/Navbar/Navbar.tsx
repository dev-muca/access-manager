import { twMerge } from "tailwind-merge";
import { TbLockUp } from "react-icons/tb";
import { useRouter } from "next/router";
import { AiOutlineDashboard } from "react-icons/ai";
import { useContext, useState } from "react";

import { Option } from "./Option";
import { ToggleButton } from "./ToggleButton";
import { LogoutButton } from "./LogoutButton";

import { UserContext } from "@/context/AuthContext";

export function Navbar() {
  const router = useRouter();

  const { Logout, session } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const toggleNav = () => setOpen(!open);
  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const NavClass = twMerge(
    "w-16 h-full rounded-md bg-white text-black duration-200 relative",
    `${open ? "w-80 shadow-2xl" : "w-16 shadow-md"}`
  );

  return (
    <nav className="h-[100vh] p-2">
      <main className={NavClass}>
        <ToggleButton displayName={session?.fullname} isToggled={open} onClick={toggleNav} />

        <ul>
          <Option
            name={"Dashboard"}
            icon={<AiOutlineDashboard size={24} />}
            onClick={() => navigateTo("/dashboard")}
            open={open}
          />
          <Option
            name={"Meus acessos"}
            icon={<TbLockUp size={24} />}
            onClick={() => navigateTo("/access")}
            open={open}
          />
        </ul>

        <LogoutButton onClick={Logout} />
      </main>
    </nav>
  );
}
