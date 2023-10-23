import { InputHTMLAttributes } from "react";
import Infobox from "@/components/Infobox";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  hasInfo?: true;
  infoMessage?: string;
}

const Radio = ({ label, checked, hasInfo, infoMessage, ...props }: RadioProps) => {
  return (
    <label className="w-fit p-2 mt-2 flex gap-2 justify-center items-center cursor-pointer select-none">
      <input type="radio" className="cursor-pointer" checked={checked} {...props} />
      <span>{label}</span>
      {hasInfo && <Infobox message={infoMessage!} />}
    </label>
  );
};

export default Radio;
