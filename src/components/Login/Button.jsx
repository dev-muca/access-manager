import { BiLoaderAlt } from "react-icons/bi";

export function Button({ text, loader, ...props }) {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-400 h-10 px-2 py-1 rounded uppercase text-white font-bold flex justify-center items-center ${
        loader ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loader ? <BiLoaderAlt size={22} className="animate-spin" /> : <span>{text}</span>}
    </button>
  );
}
