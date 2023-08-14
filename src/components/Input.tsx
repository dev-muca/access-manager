import { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { FaInfoCircle } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  const inputClass = twMerge(
    `w-[280px] h-[40px] rounded shadow px-2.5 py-1 border  ${
      error ? "border-red-600 text-red-600 placeholder:text-red-600" : "border-gray-300"
    }`,
    className
  );

  return (
    <label className="flex flex-col">
      <span className="text-sm pl-0.5 mb-0.5">{label}</span>

      <input type="text" className={inputClass} {...props} />

      {error && (
        <span className="flex items-center gap-1 text-sm text-red-600 mt-1 pl-0.5">
          <FaInfoCircle />
          <p>{error}</p>
        </span>
      )}
    </label>
  );
}
