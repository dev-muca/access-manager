import { TfiMenu, TfiArrowLeft } from "react-icons/tfi";

export function Toggle({ open, ...props }) {
  return (
    <button {...props} className="w-full flex justify-end items-center py-4 pr-5">
      {open ? <TfiArrowLeft size={20} /> : <TfiMenu size={20} />}
    </button>
  );
}
