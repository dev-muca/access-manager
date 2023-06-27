import { BiLoaderAlt } from "react-icons/bi";

export function Button({ text, loader, ...props }) {
  return (
    <button
      {...props}
      disabled={loader}
      className={`w-full bg-secundary hover:brightness-110 h-10 px-4 py-1 rounded uppercase text-white font-bold flex justify-center items-center ${
        loader ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loader ? <BiLoaderAlt size={22} className="animate-spin" /> : <span>{text}</span>}
    </button>
  );
}
