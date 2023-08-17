import { InputHTMLAttributes } from "react";
import { InfoBox } from "./InfoBox";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  hasInfo?: true;
  infoMessage?: string;
}

export function Checkbox({ label, checked, hasInfo, infoMessage, ...props }: CheckboxProps) {
  return (
    <label className="w-fit p-2 mt-2 flex gap-2 justify-center items-center cursor-pointer select-none">
      <input type="checkbox" className="cursor-pointer" checked={checked} {...props} />
      <span>{label}</span>
      {hasInfo && <InfoBox message={infoMessage!} />}
    </label>
  );
}
