import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loader?: boolean;
  className?: string;
}

const Button = ({ label, loader = false, className, ...props }: ButtonProps) => {
  const buttonClass = twMerge(
    `h-[40px] bg-tertiary px-2 py-1 rounded shadow text-white uppercase font-medium hover:brightness-105 flex justify-center items-center mt-0.5`,
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {loader ? <BiLoaderAlt size={20} className="animate-spin" /> : <span>{label}</span>}
    </button>
  );
};

export default Button;
