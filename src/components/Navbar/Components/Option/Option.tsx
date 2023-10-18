import { ButtonHTMLAttributes, ReactNode } from "react";

interface OptionsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  name: string;
  open: boolean;
}

const Option = ({ name, icon, open = false, ...props }: OptionsProps) => {
  return (
    <li>
      <button className="w-full p-1" {...props}>
        <span className="w-full h-full hover:bg-secundary hover:text-white rounded py-2 px-4 flex gap-4">
          {icon}
          {open && <p>{name}</p>}
        </span>
      </button>
    </li>
  );
};

export default Option;
