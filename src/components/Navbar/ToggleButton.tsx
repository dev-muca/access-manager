import { ButtonHTMLAttributes } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullname?: string;
  isToggled?: boolean;
}

export function ToggleButton({ fullname, isToggled = false, ...props }: ToggleProps) {
  //
  const ProfileClass = twMerge(
    `${isToggled ? "flex" : "hidden"}`,
    "absolute m-4 pt-0.5 justify-center items-center gap-4"
  );

  return (
    <>
      <Link href="/">
        <div className={ProfileClass}>
          <FaUserCircle size={24} />
          <span className="shrink-0">{fullname}</span>
        </div>
      </Link>
      <button className="w-full flex justify-end" {...props}>
        <span className="p-5">{isToggled ? <BiLeftArrowAlt size={22} /> : <GiHamburgerMenu size={22} />}</span>
      </button>
      <hr className="w-5/6 flex absolute left-1/2 -translate-x-1/2" />
    </>
  );
}
