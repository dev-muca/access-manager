import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  color?: "default" | "green" | "red";
  loader?: boolean;
  className?: string;
  disable?: true;
}

const Button = ({ children, color = "default", loader = false, className, disable, ...props }: ButtonProps) => {
  const colotToClass: any = {
    default: "bg-tertiary text-white",
    green: "bg-green-500 text-white",
    red: "bg-red-500 text-white",
  };

  const buttonClass = twMerge(
    `w-min-[280px] h-[40px] px-2 py-1 rounded shadow uppercase font-medium hover:brightness-105 flex justify-center items-center mt-0.5`,
    disable && "grayscale opacity-50 hover:brightness-100 cursor-not-allowed",
    colotToClass[color],
    className
  );

  return (
    <button className={buttonClass} {...props}>
      {loader ? <BiLoaderAlt size={20} className="animate-spin" /> : <div>{children}</div>}
    </button>
  );
};

export default Button;
