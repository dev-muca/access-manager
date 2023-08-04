import { ButtonHTMLAttributes } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLeftArrowAlt } from "react-icons/bi";

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isToggled?: boolean;
}

export function ToggleButton({ isToggled = false, ...props }: ToggleProps) {
  return (
    <button className="w-full flex justify-end" {...props}>
      <span className="p-5">{isToggled ? <BiLeftArrowAlt size={22} /> : <GiHamburgerMenu size={22} />}</span>
    </button>
  );
}
