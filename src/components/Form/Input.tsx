import { FocusEventHandler, InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { FaInfoCircle } from "react-icons/fa";

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string | false;
  multiline?: true;
  className?: string;
}

export function Input({ label, error, multiline, className, ...props }: InputProps) {
  const inputClass = twMerge(
    `h-[40px] rounded shadow px-2.5 py-1 border  ${
      error ? "border-red-600 text-red-600 placeholder:text-red-600 outline-red-600" : "border-gray-300"
    }`,
    className
  );

  const textAreaClass = twMerge(
    `w-full h-full rounded shadow px-2.5 py-1 border  ${
      error ? "border-red-600 text-red-600 placeholder:text-red-600 outline-red-600" : "border-gray-300"
    }`,
    className
  );

  return (
    <label className="w-full flex flex-col">
      <span className="text-sm pl-0.5 mb-0.5">{label}</span>

      {multiline ? (
        <textarea typeof="text" rows={3} className={textAreaClass} {...props}></textarea>
      ) : (
        <input type="text" className={inputClass} {...props} />
      )}

      {error && (
        <span className="flex items-center gap-1 text-sm text-red-600 mt-1 pl-0.5">
          <FaInfoCircle />
          <p>{error}</p>
        </span>
      )}
    </label>
  );
}
