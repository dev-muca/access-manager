import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  color?: string;
  loader?: boolean;
  className?: string;
}

const Button = ({ children, color = "default", loader = false, className, ...props }: ButtonProps) => {
  const colorClass: any = {
    default: "bg-tertiary text-white",
    red: "bg-red-500 text-white",
  };

  const buttonClass = twMerge(
    `h-[40px] px-2 py-1 rounded shadow uppercase font-medium hover:brightness-105 flex justify-center items-center mt-0.5`,
    colorClass[color],
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {loader ? <BiLoaderAlt size={20} className="animate-spin" /> : <span>{children}</span>}
    </button>
  );
};

export default Button;
