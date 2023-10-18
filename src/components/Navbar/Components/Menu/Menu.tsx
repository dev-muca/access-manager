import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiLeftArrowAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  displayName?: string;
  isToggled?: boolean;
}

const Menu = ({ displayName, isToggled = false, ...props }: ToggleProps) => {
  const ProfileClass = twMerge(
    `${isToggled ? "flex" : "hidden"}`,
    "absolute m-4 pt-0.5 justify-center items-center gap-4"
  );

  return (
    <>
      <Link href="#">
        <div className={ProfileClass}>
          <FaUserCircle size={24} />
          <span className="shrink-0">{displayName}</span>
        </div>
      </Link>
      <button className="w-full flex justify-end" {...props}>
        <span className="p-5">{isToggled ? <BiLeftArrowAlt size={22} /> : <GiHamburgerMenu size={22} />}</span>
      </button>
      <hr className="w-5/6 flex absolute left-1/2 -translate-x-1/2" />
    </>
  );
};

export default Menu;
