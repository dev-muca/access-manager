import { ButtonHTMLAttributes } from "react";

const Exit = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className="w-full absolute bottom-0 p-1">
      <p className="w-full h-full hover:bg-secundary hover:text-white rounded py-0.5">Sair</p>
    </button>
  );
};

export default Exit;
