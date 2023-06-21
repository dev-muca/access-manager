import Link from "next/link";
import { BsPersonPlusFill } from "react-icons/bs";

export function ItemNewUser({ name, to }) {
  return (
    <Link
      href={to}
      className="w-full h-11 border rounded mx-2 pl-3 flex flex-row gap-4 justify-start items-center whitespace-nowrap overflow-hidden hover:bg-emerald-100 hover:border-emerald-100"
    >
      <BsPersonPlusFill size={24} className="shrink-0" />
      <span className="overflow-hidden">{name}</span>
    </Link>
  );
}
