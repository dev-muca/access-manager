import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { BiLoaderAlt } from "react-icons/bi";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  loader?: boolean;
}

export function Button({ label, loader = false }: ButtonProps) {
  const buttonClass = twMerge(
    `h-[40px] bg-tertiary px-2 py-1 rounded shadow text-white uppercase font-medium hover:brightness-105 flex justify-center items-center`
  );
  return (
    <button className={buttonClass}>
      {loader ? <BiLoaderAlt size={20} className="animate-spin" /> : <span>{label}</span>}
    </button>
  );
}
