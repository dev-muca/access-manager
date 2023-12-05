import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbLockUp } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

import AdminMiddleware from "../AdminMiddleware";
import Exit from "./Components/Exit";
import Menu from "./Components/Menu";
import Option from "./Components/Option";

import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();

  const { Logout, session } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const toggleNav = () => setOpen(!open);

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push({
      pathname: path,
    });
  };

  const NavClass = twMerge(
    "w-16 h-full rounded-md bg-white text-black duration-200 relative",
    `${open ? "w-80 shadow-2xl" : "w-16 shadow-md"}`
  );

  return (
    <nav className="h-[100vh] p-2">
      <main className={NavClass}>
        <Menu displayName={session?.fullname} isToggled={open} onClick={toggleNav} />

        <ul className="h-4/5 overflow-hidden">
          <Option
            name={"Dashboard"}
            icon={<AiOutlineDashboard size={24} />}
            onClick={() => navigateTo("/Dashboard")}
            open={open}
          />
          <Option
            name={"Meus acessos"}
            icon={<TbLockUp size={24} />}
            onClick={() => navigateTo("/Access")}
            open={open}
          />
          <AdminMiddleware>
            <Option
              name={"Administrador"}
              icon={<MdOutlineAdminPanelSettings size={24} />}
              onClick={() => navigateTo("/Admin")}
              open={open}
            />
          </AdminMiddleware>
        </ul>

        <Exit onClick={Logout} />
      </main>
    </nav>
  );
};

export default Navbar;
