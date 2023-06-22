import Link from "next/link";
import { Icon } from "@/components/Icon";

export function ItemMenu({ name, icon = "BiHelpCircle", to }) {
  return (
    <Link
      href={to}
      className={`w-full h-11 border rounded mx-2 pl-3 flex flex-row gap-4 justify-start items-center whitespace-nowrap overflow-hidden bg-white hover:bg-black hover:text-white hover:border-black`}
    >
      <Icon nameIcon={icon} size={20} className="shrink-0" />
      <span className="overflow-hidden">{name}</span>
    </Link>
  );
}
