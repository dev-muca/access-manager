import { FormHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FormCardProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

export function FormCard({ children, className, ...props }: FormCardProps) {
  const formClass = twMerge(`bg-white p-12 rounded shadow-xl flex flex-col gap-8`, className);
  return (
    <form className={formClass} {...props}>
      {children}
    </form>
  );
}
